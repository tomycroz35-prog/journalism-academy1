-- Journalism Academy: Supabase schema
-- Paste this whole file into Supabase Dashboard > SQL Editor > New query, then Run.
-- The browser app must use only the publishable/anon key. NEVER put service_role here.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'student' check (role in ('student','doctor','admin')),
  year smallint check (year between 1 and 4),
  created_at timestamptz not null default now()
);

-- Role assignment is intentionally controlled by the database, not signup form metadata.
create or replace function public.ja_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, year)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name',''), split_part(new.email,'@',1)),
    'student',
    case when coalesce(new.raw_user_meta_data->>'year','') ~ '^[1-4]$'
      then (new.raw_user_meta_data->>'year')::smallint else null end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists ja_on_auth_user_created on auth.users;
create trigger ja_on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.ja_handle_new_user();

create or replace function public.ja_current_role()
returns text language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() $$;

create or replace function public.ja_current_year()
returns smallint language sql stable security definer set search_path = public
as $$ select year from public.profiles where id = auth.uid() $$;

grant execute on function public.ja_current_role() to authenticated;
grant execute on function public.ja_current_year() to authenticated;


create table if not exists public.courses (
  id text primary key,
  year smallint not null check (year between 1 and 4),
  title text not null,
  category text not null default 'مقرر تعليمي',
  description text not null default '',
  lessons jsonb not null default '[]'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);


create or replace function public.ja_teacher_owns_course_for_year(p_course_id text, p_year smallint)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.courses c where c.id = p_course_id and (c.created_by = auth.uid() or c.created_by is null) and c.year = p_year) $$;
grant execute on function public.ja_teacher_owns_course_for_year(text,smallint) to authenticated;

create table if not exists public.course_enrollments (
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

create table if not exists public.quizzes (
  id text primary key,
  course_id text references public.courses(id) on delete set null,
  year smallint not null check (year between 1 and 4),
  title text not null,
  description text not null default '',
  created_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id text not null references public.quizzes(id) on delete cascade,
  sort_order integer not null default 0,
  prompt text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) between 2 and 6),
  created_at timestamptz not null default now()
);

-- Correct answers are kept in a separate table and are never selectable by browser clients.
create table if not exists public.quiz_answer_keys (
  question_id uuid primary key references public.quiz_questions(id) on delete cascade,
  correct_option smallint not null check (correct_option between 0 and 5)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id text not null references public.quizzes(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  student_name text not null,
  student_email text not null,
  year smallint not null check (year between 1 and 4),
  score integer not null,
  total integer not null,
  percentage integer not null,
  answers jsonb not null default '[]'::jsonb,
  submitted_at timestamptz not null default now()
);

create table if not exists public.pdf_resources (
  id uuid primary key default gen_random_uuid(),
  course_id text not null references public.courses(id) on delete cascade,
  title text not null,
  filename text not null,
  storage_path text not null unique,
  size_bytes bigint not null default 0,
  uploaded_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Starter catalog: the 16 courses already shown by the current Journalism Academy site.
insert into public.courses (id, year, title, category, description, lessons, created_by) values
('c101', 1, 'مدخل إلى الصحافة والإعلام', 'مقرر أساسي', 'تعرف على مفهوم الصحافة والإعلام، ونشأة الصحافة وتطورها ووظائفها في المجتمع.', '["مفهوم الصحافة والإعلام والفرق بينهما", "نشأة الصحافة وتطورها تاريخيًا", "وظائف الصحافة ودورها في المجتمع", "أنواع الصحف ووسائل الإعلام", "خصائص الخبر الصحفي ومصادره"]'::jsonb, null),
('c102', 1, 'أساسيات التحرير الصحفي', 'مقرر أساسي', 'ابدأ من بناء الجملة الصحفية لحد كتابة خبر واضح ودقيق وجذاب.', '["مفهوم التحرير الصحفي ومهارات المحرر", "عناصر الخبر الصحفي الستة", "قواعد صياغة العنوان والمقدمة", "الهرم المقلوب وترتيب المعلومات", "مراجعة الخبر والتأكد من الدقة"]'::jsonb, null),
('c103', 1, 'مدخل إلى علوم الاتصال', 'مقرر أساسي', 'افهم عملية الاتصال وعناصرها ونماذجها وتأثير وسائل الإعلام على الجمهور.', '["مفهوم الاتصال وعناصر العملية الاتصالية", "أنواع الاتصال ومستوياته", "نماذج الاتصال التقليدية والحديثة", "الجمهور وخصائصه", "التأثير الإعلامي والرأي العام"]'::jsonb, null),
('c104', 1, 'التصوير الصحفي', 'تدريب عملي', 'تعلم أساسيات الصورة الصحفية وعلاقتها بالقصة الخبرية وأخلاقيات استخدامها.', '["الصورة الصحفية ووظيفتها", "أساسيات التكوين وزوايا التصوير", "الإضاءة واللقطة المناسبة", "كتابة التعليق المصاحب للصورة", "أخلاقيات الصورة والتحقق منها"]'::jsonb, null),
('c201', 2, 'فنون الكتابة الصحفية', 'مقرر أساسي', 'ادرس أشكال الكتابة الصحفية المختلفة وطرق إعداد التقرير والحوار والمقال.', '["الخبر والتقرير الصحفي: الفروق والخصائص", "كتابة الحديث والحوار الصحفي", "المقال الصحفي وأنواعه", "كتابة التحقيق الصحفي", "التدريب على الصياغة وإعادة التحرير"]'::jsonb, null),
('c202', 2, 'الصحافة الإلكترونية', 'مقرر أساسي', 'اكتشف طبيعة النشر الرقمي وتحديثاته والتفاعل مع الجمهور عبر المنصات.', '["نشأة الصحافة الإلكترونية وخصائصها", "بناء القصة الصحفية الرقمية", "العناوين لمحركات البحث", "الوسائط المتعددة والتفاعل", "أدوات النشر والتحقق الرقمي"]'::jsonb, null),
('c203', 2, 'الإخراج الصحفي', 'مقرر تخصصي', 'تعرف على مبادئ تصميم الصفحات الصحفية وتوزيع العناصر البصرية.', '["مفهوم الإخراج الصحفي وأهميته", "عناصر الصفحة الصحفية", "التوازن والتباين والتسلسل البصري", "اختيار الصور والعناوين", "أساسيات تصميم الصفحة"]'::jsonb, null),
('c204', 2, 'مناهج البحث الإعلامي', 'مقرر أساسي', 'تعلم خطوات البحث العلمي وصياغة المشكلة واختيار أدوات جمع البيانات.', '["مفهوم البحث العلمي وأهدافه", "اختيار المشكلة وصياغة الأسئلة", "المناهج الكمية والكيفية", "الاستبيان والمقابلة وتحليل المضمون", "توثيق المصادر وكتابة النتائج"]'::jsonb, null),
('c301', 3, 'التحقيقات الصحفية والاستقصائية', 'مقرر تخصصي', 'تعلم بناء التحقيق الصحفي وجمع الأدلة ومقارنة الروايات وحماية المصادر.', '["مفهوم التحقيق الصحفي وأنواعه", "اختيار الفكرة وبناء فرضية التحقيق", "جمع الوثائق والمقابلات والأدلة", "التحقق والموازنة بين الروايات", "كتابة التحقيق والمراجعة القانونية والأخلاقية"]'::jsonb, null),
('c302', 3, 'صحافة البيانات', 'تدريب عملي', 'حول الأرقام والبيانات إلى قصص صحفية مفهومة وقائمة على الأدلة.', '["ما هي صحافة البيانات؟", "البحث عن مجموعات البيانات", "تنظيف البيانات وقراءتها", "اختيار الرسم البصري المناسب", "كتابة قصة صحفية مدعومة بالبيانات"]'::jsonb, null),
('c303', 3, 'الإعلام المتخصص', 'مقرر تخصصي', 'استكشف الصحافة الاقتصادية والرياضية والثقافية والعلمية وغيرها من التخصصات.', '["مفهوم الإعلام المتخصص", "الصحافة الاقتصادية ومصادرها", "الصحافة الرياضية وأخلاقياتها", "الصحافة الثقافية والعلمية", "بناء ملف صحفي متخصص"]'::jsonb, null),
('c304', 3, 'أخلاقيات وتشريعات الإعلام', 'مقرر أساسي', 'افهم المسؤولية المهنية وحقوق الأفراد والضوابط القانونية للعمل الصحفي.', '["المبادئ الأخلاقية للعمل الصحفي", "الدقة والموضوعية وتجنب تضارب المصالح", "الخصوصية وحق الرد", "التشهير وحقوق الملكية الفكرية", "المسؤولية القانونية للمحرر والمؤسسة"]'::jsonb, null),
('c401', 4, 'إدارة المؤسسات الصحفية', 'مقرر تخصصي', 'تعرف على هيكل المؤسسة الصحفية وإدارة غرف الأخبار والتخطيط والتحرير.', '["هيكل المؤسسة الصحفية وأقسامها", "إدارة غرفة الأخبار وتوزيع المهام", "التخطيط التحريري والاجتماعات", "إدارة الموارد والإيرادات", "قياس الأداء والتطوير المؤسسي"]'::jsonb, null),
('c402', 4, 'صحافة الموبايل والإنتاج الرقمي', 'تدريب عملي', 'استخدم الهاتف في إعداد وتسجيل وتحرير ونشر القصص الصحفية متعددة الوسائط.', '["مفهوم صحافة الموبايل ومعداتها", "تسجيل الصوت والصورة بالموبايل", "إعداد مقابلة ومادة ميدانية", "المونتاج والتحرير السريع", "النشر الرقمي والسلامة المهنية"]'::jsonb, null),
('c403', 4, 'مشروع التخرج', 'مشروع تطبيقي', 'خطط ونفذ مشروعًا صحفيًا متكاملًا من الفكرة والبحث حتى النشر والتقييم.', '["اختيار فكرة المشروع وتحديد الجمهور", "إعداد خطة تحريرية وجدول زمني", "جمع المادة الصحفية والتحقق", "الإنتاج والمراجعة النهائية", "عرض المشروع وتقييمه"]'::jsonb, null),
('c404', 4, 'التدريب الميداني', 'تدريب عملي', 'اربط الدراسة بسوق العمل من خلال مهام تحرير وتغطية وممارسة مهنية.', '["التعرف على بيئة العمل الصحفي", "إعداد تكليفات تحريرية يومية", "التغطية الميدانية وإجراء المقابلات", "العمل ضمن فريق غرفة الأخبار", "تقرير التدريب والتقييم الذاتي"]'::jsonb, null)
on conflict (id) do nothing;

-- Enable RLS on every public table used by the browser.
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_answer_keys enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.pdf_resources enable row level security;

-- Profiles: users may read their own profile. The role and year are not writable by clients.
drop policy if exists ja_profiles_read_self on public.profiles;
create policy ja_profiles_read_self on public.profiles for select to authenticated using (id = auth.uid());
grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;
drop policy if exists ja_profiles_update_self on public.profiles;
create policy ja_profiles_update_self on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Courses: all signed-in users can view the catalog; only approved teachers can manage their own.
drop policy if exists ja_courses_read_auth on public.courses;
create policy ja_courses_read_auth on public.courses for select to authenticated using (auth.uid() is not null);
drop policy if exists ja_courses_insert_teacher on public.courses;
create policy ja_courses_insert_teacher on public.courses for insert to authenticated
  with check (created_by = auth.uid() and public.ja_current_role() in ('doctor','admin'));
drop policy if exists ja_courses_update_teacher on public.courses;
create policy ja_courses_update_teacher on public.courses for update to authenticated
  using (created_by = auth.uid() and public.ja_current_role() in ('doctor','admin'))
  with check (created_by = auth.uid() and public.ja_current_role() in ('doctor','admin'));
drop policy if exists ja_courses_delete_teacher on public.courses;
create policy ja_courses_delete_teacher on public.courses for delete to authenticated
  using (created_by = auth.uid() and public.ja_current_role() in ('doctor','admin'));
grant select on public.courses to authenticated;
grant insert, update, delete on public.courses to authenticated;

-- Course enrollment: students can enroll only in a course for their own year.
drop policy if exists ja_enrollments_read_self on public.course_enrollments;
create policy ja_enrollments_read_self on public.course_enrollments for select to authenticated using (user_id = auth.uid());
drop policy if exists ja_enrollments_insert_self on public.course_enrollments;
create policy ja_enrollments_insert_self on public.course_enrollments for insert to authenticated
  with check (user_id = auth.uid() and public.ja_current_role() = 'student' and exists (
    select 1 from public.courses c where c.id = course_id and c.year = public.ja_current_year()
  ));
drop policy if exists ja_enrollments_delete_self on public.course_enrollments;
create policy ja_enrollments_delete_self on public.course_enrollments for delete to authenticated using (user_id = auth.uid());
grant select, insert, delete on public.course_enrollments to authenticated;

-- Quizzes: students see tests for their year; teachers manage only tests they authored.
drop policy if exists ja_quizzes_read_year_or_owner on public.quizzes;
create policy ja_quizzes_read_year_or_owner on public.quizzes for select to authenticated
  using (year = public.ja_current_year() or created_by = auth.uid() or public.ja_current_role() = 'admin');
drop policy if exists ja_quizzes_insert_teacher on public.quizzes;
create policy ja_quizzes_insert_teacher on public.quizzes for insert to authenticated
  with check (created_by = auth.uid() and public.ja_current_role() in ('doctor','admin') and
    (course_id is null or public.ja_teacher_owns_course_for_year(course_id, year)));
drop policy if exists ja_quizzes_update_teacher on public.quizzes;
create policy ja_quizzes_update_teacher on public.quizzes for update to authenticated
  using (created_by = auth.uid() and public.ja_current_role() in ('doctor','admin'))
  with check (created_by = auth.uid() and public.ja_current_role() in ('doctor','admin'));
drop policy if exists ja_quizzes_delete_teacher on public.quizzes;
create policy ja_quizzes_delete_teacher on public.quizzes for delete to authenticated
  using (created_by = auth.uid() and public.ja_current_role() in ('doctor','admin'));
grant select, insert, update, delete on public.quizzes to authenticated;

-- Questions are visible to the target class, but answer keys are never selected by the browser.
drop policy if exists ja_questions_read_year_or_owner on public.quiz_questions;
create policy ja_questions_read_year_or_owner on public.quiz_questions for select to authenticated using (exists (
  select 1 from public.quizzes q where q.id = quiz_id and (q.year = public.ja_current_year() or q.created_by = auth.uid() or public.ja_current_role() = 'admin')
));
drop policy if exists ja_questions_insert_teacher on public.quiz_questions;
create policy ja_questions_insert_teacher on public.quiz_questions for insert to authenticated with check (exists (
  select 1 from public.quizzes q where q.id = quiz_id and q.created_by = auth.uid() and public.ja_current_role() in ('doctor','admin')
));
drop policy if exists ja_questions_update_teacher on public.quiz_questions;
create policy ja_questions_update_teacher on public.quiz_questions for update to authenticated using (exists (
  select 1 from public.quizzes q where q.id = quiz_id and q.created_by = auth.uid() and public.ja_current_role() in ('doctor','admin')
)) with check (exists (
  select 1 from public.quizzes q where q.id = quiz_id and q.created_by = auth.uid() and public.ja_current_role() in ('doctor','admin')
));
drop policy if exists ja_questions_delete_teacher on public.quiz_questions;
create policy ja_questions_delete_teacher on public.quiz_questions for delete to authenticated using (exists (
  select 1 from public.quizzes q where q.id = quiz_id and q.created_by = auth.uid() and public.ja_current_role() in ('doctor','admin')
));
grant select, insert, update, delete on public.quiz_questions to authenticated;

-- Answer keys: no SELECT policy and no SELECT grant. Teachers may only insert/delete keys for their own quiz.
drop policy if exists ja_keys_insert_teacher on public.quiz_answer_keys;
create policy ja_keys_insert_teacher on public.quiz_answer_keys for insert to authenticated with check (exists (
  select 1 from public.quiz_questions qq join public.quizzes q on q.id = qq.quiz_id
  where qq.id = question_id and q.created_by = auth.uid() and public.ja_current_role() in ('doctor','admin')
));
drop policy if exists ja_keys_delete_teacher on public.quiz_answer_keys;
create policy ja_keys_delete_teacher on public.quiz_answer_keys for delete to authenticated using (exists (
  select 1 from public.quiz_questions qq join public.quizzes q on q.id = qq.quiz_id
  where qq.id = question_id and q.created_by = auth.uid() and public.ja_current_role() in ('doctor','admin')
));
grant insert, delete on public.quiz_answer_keys to authenticated;

-- Attempts: students see their own results; teachers see results only for their quizzes.
drop policy if exists ja_attempts_read_self_or_teacher on public.quiz_attempts;
create policy ja_attempts_read_self_or_teacher on public.quiz_attempts for select to authenticated
  using (student_id = auth.uid() or exists (select 1 from public.quizzes q where q.id = quiz_id and q.created_by = auth.uid()));
grant select on public.quiz_attempts to authenticated;

-- PDFs metadata: target-year students can read; only the owning teacher can upload/delete.
drop policy if exists ja_pdf_resources_read_allowed on public.pdf_resources;
create policy ja_pdf_resources_read_allowed on public.pdf_resources for select to authenticated using (exists (
  select 1 from public.courses c where c.id = course_id and
    (((c.created_by = auth.uid() or c.created_by is null) and uploaded_by = auth.uid()) or (c.year = public.ja_current_year() and public.ja_current_role() = 'student'))
));
drop policy if exists ja_pdf_resources_insert_teacher on public.pdf_resources;
create policy ja_pdf_resources_insert_teacher on public.pdf_resources for insert to authenticated with check (
  uploaded_by = auth.uid() and public.ja_current_role() in ('doctor','admin') and exists (
    select 1 from public.courses c where c.id = course_id and (c.created_by = auth.uid() or c.created_by is null)
  )
);
drop policy if exists ja_pdf_resources_delete_teacher on public.pdf_resources;
create policy ja_pdf_resources_delete_teacher on public.pdf_resources for delete to authenticated using (
  uploaded_by = auth.uid() and exists (select 1 from public.courses c where c.id = course_id and (c.created_by = auth.uid() or c.created_by is null))
);
grant select, insert, delete on public.pdf_resources to authenticated;

-- Server-side scoring. Students send selected options; correct answers stay private until scoring finishes.
create or replace function public.ja_submit_quiz_attempt(p_quiz_id text, p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
  v_profile public.profiles%rowtype;
  v_quiz public.quizzes%rowtype;
  v_total integer;
  v_matched integer;
  v_score integer;
  v_percentage integer;
  v_attempt_id uuid;
  v_review jsonb;
  v_now timestamptz := now();
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  select * into v_profile from public.profiles where id = v_user_id;
  if not found or v_profile.role <> 'student' or v_profile.year is null then raise exception 'Student account required'; end if;
  select * into v_quiz from public.quizzes where id = p_quiz_id;
  if not found or v_quiz.year <> v_profile.year then raise exception 'Quiz is not available for your class'; end if;
  if jsonb_typeof(p_answers) is distinct from 'array' then raise exception 'Answers must be an array'; end if;
  select count(*) into v_total from public.quiz_questions where quiz_id = p_quiz_id;
  if v_total = 0 or jsonb_array_length(p_answers) <> v_total then raise exception 'Answer every question'; end if;
  select count(distinct qq.id),
         count(distinct qq.id) filter (where k.correct_option = (submitted.item->>'selected_option')::integer)
    into v_matched, v_score
    from jsonb_array_elements(p_answers) as submitted(item)
    join public.quiz_questions qq on qq.id = (submitted.item->>'question_id')::uuid and qq.quiz_id = p_quiz_id
    join public.quiz_answer_keys k on k.question_id = qq.id
   where (submitted.item->>'selected_option') ~ '^[0-5]$';
  if v_matched <> v_total then raise exception 'Invalid or incomplete answers'; end if;
  v_percentage := round((v_score::numeric / v_total::numeric) * 100)::integer;
  insert into public.quiz_attempts (quiz_id, student_id, student_name, student_email, year, score, total, percentage, answers, submitted_at)
  values (p_quiz_id, v_user_id, v_profile.full_name, coalesce(auth.jwt()->>'email',''), v_profile.year, v_score, v_total, v_percentage, p_answers, v_now)
  returning id into v_attempt_id;
  select jsonb_agg(jsonb_build_object(
    'question_id', qq.id,
    'prompt', qq.prompt,
    'options', qq.options,
    'correct_option', k.correct_option,
    'selected_option', (submitted.item->>'selected_option')::integer
  ) order by qq.sort_order)
  into v_review
  from jsonb_array_elements(p_answers) as submitted(item)
  join public.quiz_questions qq on qq.id = (submitted.item->>'question_id')::uuid and qq.quiz_id = p_quiz_id
  join public.quiz_answer_keys k on k.question_id = qq.id;
  return jsonb_build_object('attempt_id', v_attempt_id, 'score', v_score, 'total', v_total, 'percentage', v_percentage, 'submitted_at', v_now, 'review', coalesce(v_review,'[]'::jsonb));
end;
$$;
revoke all on function public.ja_submit_quiz_attempt(text,jsonb) from public;
grant execute on function public.ja_submit_quiz_attempt(text,jsonb) to authenticated;

-- Private PDF bucket. File paths are: <teacher-user-id>/<course-id>/<unique-file-name>.pdf
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lecture-pdfs', 'lecture-pdfs', false, 20971520, array['application/pdf'])
on conflict (id) do update set public = false, file_size_limit = 20971520, allowed_mime_types = array['application/pdf'];

drop policy if exists ja_pdf_storage_insert_teacher on storage.objects;
create policy ja_pdf_storage_insert_teacher on storage.objects for insert to authenticated with check (
  bucket_id = 'lecture-pdfs' and (storage.foldername(name))[1] = auth.uid()::text and exists (
    select 1 from public.courses c where c.id = (storage.foldername(name))[2] and (c.created_by = auth.uid() or c.created_by is null)
  ) and public.ja_current_role() in ('doctor','admin')
);
drop policy if exists ja_pdf_storage_read_allowed on storage.objects;
create policy ja_pdf_storage_read_allowed on storage.objects for select to authenticated using (
  bucket_id = 'lecture-pdfs' and exists (
    select 1 from public.pdf_resources r join public.courses c on c.id = r.course_id
    where r.storage_path = name and (
      ((c.created_by = auth.uid() or c.created_by is null) and r.uploaded_by = auth.uid()) or
      (c.year = public.ja_current_year() and public.ja_current_role() = 'student')
    )
  )
);
drop policy if exists ja_pdf_storage_delete_teacher on storage.objects;
create policy ja_pdf_storage_delete_teacher on storage.objects for delete to authenticated using (
  bucket_id = 'lecture-pdfs' and (storage.foldername(name))[1] = auth.uid()::text and exists (
    select 1 from public.courses c where c.id = (storage.foldername(name))[2] and (c.created_by = auth.uid() or c.created_by is null)
  )
);

-- Useful indexes
create index if not exists ja_courses_year_idx on public.courses(year);
create index if not exists ja_quizzes_year_idx on public.quizzes(year);
create index if not exists ja_quizzes_creator_idx on public.quizzes(created_by);
create index if not exists ja_attempts_student_idx on public.quiz_attempts(student_id, submitted_at desc);
create index if not exists ja_pdf_course_idx on public.pdf_resources(course_id);

-- IMPORTANT: promote a lecturer only after confirming their identity, using SQL Editor:
-- update public.profiles set role = 'doctor' where id = (select id from auth.users where email = 'lecturer@example.com');
