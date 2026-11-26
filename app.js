'use strict';

const YEAR_NAMES = {1:'الفرقة الأولى صحافة',2:'الفرقة الثانية صحافة',3:'الفرقة الثالثة صحافة',4:'الفرقة الرابعة صحافة'};
const DEFAULT_COURSES = [
  {id:'c101',year:1,title:'مدخل إلى الصحافة والإعلام',category:'مقرر أساسي',description:'تعرف على مفهوم الصحافة والإعلام، ونشأة الصحافة وتطورها ووظائفها في المجتمع.',lessons:['مفهوم الصحافة والإعلام والفرق بينهما','نشأة الصحافة وتطورها تاريخيًا','وظائف الصحافة ودورها في المجتمع','أنواع الصحف ووسائل الإعلام','خصائص الخبر الصحفي ومصادره']},
  {id:'c102',year:1,title:'أساسيات التحرير الصحفي',category:'مقرر أساسي',description:'ابدأ من بناء الجملة الصحفية لحد كتابة خبر واضح ودقيق وجذاب.',lessons:['مفهوم التحرير الصحفي ومهارات المحرر','عناصر الخبر الصحفي الستة','قواعد صياغة العنوان والمقدمة','الهرم المقلوب وترتيب المعلومات','مراجعة الخبر والتأكد من الدقة']},
  {id:'c103',year:1,title:'مدخل إلى علوم الاتصال',category:'مقرر أساسي',description:'افهم عملية الاتصال وعناصرها ونماذجها وتأثير وسائل الإعلام على الجمهور.',lessons:['مفهوم الاتصال وعناصر العملية الاتصالية','أنواع الاتصال ومستوياته','نماذج الاتصال التقليدية والحديثة','الجمهور وخصائصه','التأثير الإعلامي والرأي العام']},
  {id:'c104',year:1,title:'التصوير الصحفي',category:'تدريب عملي',description:'تعلم أساسيات الصورة الصحفية وعلاقتها بالقصة الخبرية وأخلاقيات استخدامها.',lessons:['الصورة الصحفية ووظيفتها','أساسيات التكوين وزوايا التصوير','الإضاءة واللقطة المناسبة','كتابة التعليق المصاحب للصورة','أخلاقيات الصورة والتحقق منها']},
  {id:'c201',year:2,title:'فنون الكتابة الصحفية',category:'مقرر أساسي',description:'ادرس أشكال الكتابة الصحفية المختلفة وطرق إعداد التقرير والحوار والمقال.',lessons:['الخبر والتقرير الصحفي: الفروق والخصائص','كتابة الحديث والحوار الصحفي','المقال الصحفي وأنواعه','كتابة التحقيق الصحفي','التدريب على الصياغة وإعادة التحرير']},
  {id:'c202',year:2,title:'الصحافة الإلكترونية',category:'مقرر أساسي',description:'اكتشف طبيعة النشر الرقمي وتحديثاته والتفاعل مع الجمهور عبر المنصات.',lessons:['نشأة الصحافة الإلكترونية وخصائصها','بناء القصة الصحفية الرقمية','العناوين لمحركات البحث','الوسائط المتعددة والتفاعل','أدوات النشر والتحقق الرقمي']},
  {id:'c203',year:2,title:'الإخراج الصحفي',category:'مقرر تخصصي',description:'تعرف على مبادئ تصميم الصفحات الصحفية وتوزيع العناصر البصرية.',lessons:['مفهوم الإخراج الصحفي وأهميته','عناصر الصفحة الصحفية','التوازن والتباين والتسلسل البصري','اختيار الصور والعناوين','أساسيات تصميم الصفحة']},
  {id:'c204',year:2,title:'مناهج البحث الإعلامي',category:'مقرر أساسي',description:'تعلم خطوات البحث العلمي وصياغة المشكلة واختيار أدوات جمع البيانات.',lessons:['مفهوم البحث العلمي وأهدافه','اختيار المشكلة وصياغة الأسئلة','المناهج الكمية والكيفية','الاستبيان والمقابلة وتحليل المضمون','توثيق المصادر وكتابة النتائج']},
  {id:'c301',year:3,title:'التحقيقات الصحفية والاستقصائية',category:'مقرر تخصصي',description:'تعلم بناء التحقيق الصحفي وجمع الأدلة ومقارنة الروايات وحماية المصادر.',lessons:['مفهوم التحقيق الصحفي وأنواعه','اختيار الفكرة وبناء فرضية التحقيق','جمع الوثائق والمقابلات والأدلة','التحقق والموازنة بين الروايات','كتابة التحقيق والمراجعة القانونية والأخلاقية']},
  {id:'c302',year:3,title:'صحافة البيانات',category:'تدريب عملي',description:'حول الأرقام والبيانات إلى قصص صحفية مفهومة وقائمة على الأدلة.',lessons:['ما هي صحافة البيانات؟','البحث عن مجموعات البيانات','تنظيف البيانات وقراءتها','اختيار الرسم البصري المناسب','كتابة قصة صحفية مدعومة بالبيانات']},
  {id:'c303',year:3,title:'الإعلام المتخصص',category:'مقرر تخصصي',description:'استكشف الصحافة الاقتصادية والرياضية والثقافية والعلمية وغيرها من التخصصات.',lessons:['مفهوم الإعلام المتخصص','الصحافة الاقتصادية ومصادرها','الصحافة الرياضية وأخلاقياتها','الصحافة الثقافية والعلمية','بناء ملف صحفي متخصص']},
  {id:'c304',year:3,title:'أخلاقيات وتشريعات الإعلام',category:'مقرر أساسي',description:'افهم المسؤولية المهنية وحقوق الأفراد والضوابط القانونية للعمل الصحفي.',lessons:['المبادئ الأخلاقية للعمل الصحفي','الدقة والموضوعية وتجنب تضارب المصالح','الخصوصية وحق الرد','التشهير وحقوق الملكية الفكرية','المسؤولية القانونية للمحرر والمؤسسة']},
  {id:'c401',year:4,title:'إدارة المؤسسات الصحفية',category:'مقرر تخصصي',description:'تعرف على هيكل المؤسسة الصحفية وإدارة غرف الأخبار والتخطيط والتحرير.',lessons:['هيكل المؤسسة الصحفية وأقسامها','إدارة غرفة الأخبار وتوزيع المهام','التخطيط التحريري والاجتماعات','إدارة الموارد والإيرادات','قياس الأداء والتطوير المؤسسي']},
  {id:'c402',year:4,title:'صحافة الموبايل والإنتاج الرقمي',category:'تدريب عملي',description:'استخدم الهاتف في إعداد وتسجيل وتحرير ونشر القصص الصحفية متعددة الوسائط.',lessons:['مفهوم صحافة الموبايل ومعداتها','تسجيل الصوت والصورة بالموبايل','إعداد مقابلة ومادة ميدانية','المونتاج والتحرير السريع','النشر الرقمي والسلامة المهنية']},
  {id:'c403',year:4,title:'مشروع التخرج',category:'مشروع تطبيقي',description:'خطط ونفذ مشروعًا صحفيًا متكاملًا من الفكرة والبحث حتى النشر والتقييم.',lessons:['اختيار فكرة المشروع وتحديد الجمهور','إعداد خطة تحريرية وجدول زمني','جمع المادة الصحفية والتحقق','الإنتاج والمراجعة النهائية','عرض المشروع وتقييمه']},
  {id:'c404',year:4,title:'التدريب الميداني',category:'تدريب عملي',description:'اربط الدراسة بسوق العمل من خلال مهام تحرير وتغطية وممارسة مهنية.',lessons:['التعرف على بيئة العمل الصحفي','إعداد تكليفات تحريرية يومية','التغطية الميدانية وإجراء المقابلات','العمل ضمن فريق غرفة الأخبار','تقرير التدريب والتقييم الذاتي']}
];

const QUIZ = [
  {q:'أي عنصر يجيب عن سؤال: أين وقع الحدث؟',opts:['متى','أين','لماذا','كيف'],a:1,why:'عنصر «أين» بيحدد المكان اللي وقع فيه الحدث.'},
  {q:'ما المقصود بالهرم المقلوب في كتابة الخبر؟',opts:['تأجيل أهم معلومة للنهاية','عرض التفاصيل بترتيب زمني فقط','وضع أهم المعلومات في البداية ثم التفاصيل الأقل أهمية','كتابة الخبر دون مقدمة'],a:2,why:'الهرم المقلوب بيبدأ بالمعلومات الأهم، وبعدها التفاصيل الداعمة والأقل أهمية.'},
  {q:'ما التصرف المهني الصحيح قبل نشر معلومة مثيرة للجدل؟',opts:['نشرها بسرعة قبل المنافسين','الاعتماد على منشور واحد','التحقق منها من مصادر موثوقة ومتعددة','حذف اسم المصدر فقط'],a:2,why:'التحقق ومقارنة المصادر خطوة أساسية لتقليل الأخطاء الصحفية.'},
  {q:'أي مما يلي يُعد مصدرًا أوليًا للمعلومة؟',opts:['شخص شاهد الحدث بنفسه','تعليق مجهول على الإنترنت','ملخص صحفي منقول','منشور لا يذكر مصدرًا'],a:0,why:'الشاهد المباشر مصدر أولي، مع ضرورة التحقق من روايته ومقارنتها بالأدلة.'},
  {q:'ما الهدف الأساسي من العنوان الصحفي؟',opts:['إضافة رأي الكاتب','تلخيص زاوية الخبر وجذب القارئ بدقة','تكرار المقدمة حرفيًا','إخفاء موضوع الخبر'],a:1,why:'العنوان يقدم الفكرة الأساسية بوضوح وجاذبية من غير تضليل.'}
];

const STORAGE = {courses:'ja_courses_v1',users:'ja_users_v1',session:'ja_session_v1',enrolled:'ja_enrolled_v1',pdfs:'ja_pdf_attachments_v1',quizzes:'ja_quizzes_v1',attempts:'ja_quiz_attempts_v1'};
const JA_SUPABASE_CONFIG = window.JA_SUPABASE_CONFIG || {};
const supabaseClient = (window.supabase && /^https:\/\//.test(JA_SUPABASE_CONFIG.url || '') && JA_SUPABASE_CONFIG.anonKey && !String(JA_SUPABASE_CONFIG.anonKey).includes('PASTE_'))
  ? window.supabase.createClient(JA_SUPABASE_CONFIG.url, JA_SUPABASE_CONFIG.anonKey, {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}})
  : null;
let courses = loadJSON(STORAGE.courses, DEFAULT_COURSES);
let users = loadJSON(STORAGE.users, []);
let currentUser = supabaseClient ? null : loadJSON(STORAGE.session, null);
let enrolled = loadJSON(STORAGE.enrolled, {});
let pdfAttachments = loadJSON(STORAGE.pdfs, []);
let teacherQuizzes = loadJSON(STORAGE.quizzes, []);
let quizAttempts = loadJSON(STORAGE.attempts, []);
let pdfDatabasePromise = null;
let selectedYear = 1;
let authMode = 'login';
let activePractice = 'quiz';
let quizSubmitted = false;
let toastTimer;

function loadJSON(key,fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch(e){return fallback}}
function save(key,value){localStorage.setItem(key,JSON.stringify(value))}
function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function courseById(id){return courses.find(c=>c.id===id)}
function showToast(message){const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2500)}
function go(page){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));const target=document.getElementById('page-'+page);if(target)target.classList.add('active');document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.page===page));document.getElementById('mainNav').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});if(page==='courses')renderCourses();if(page==='dashboard')renderDashboard();if(page==='doctor')renderDoctorDashboard();}
function renderHomeYears(){const holder=document.getElementById('homeYearGrid');holder.innerHTML=[1,2,3,4].map(y=>`<button class="year-card" data-year="${y}"><span class="year-number">${String(y).padStart(2,'0')}</span><h3>${YEAR_NAMES[y]}</h3><p>${y===1?'ابدأ بتأسيس معرفتك ومهاراتك الصحفية':y===2?'طور أدوات الكتابة والإنتاج الصحفي':y===3?'تعمق في التخصص والتحليل والاستقصاء':'جهز نفسك لسوق العمل ومشروع التخرج'}</p><span class="course-total">${courses.filter(c=>Number(c.year)===y).length} مقررات متاحة</span><span class="arrow">←</span></button>`).join('');holder.querySelectorAll('[data-year]').forEach(b=>b.addEventListener('click',()=>{selectedYear=Number(b.dataset.year);renderCourses();go('courses')}))}
function renderYearTabs(){const holder=document.getElementById('courseYearTabs');holder.innerHTML=[1,2,3,4].map(y=>`<button class="year-tab ${selectedYear===y?'active':''}" data-y="${y}">${YEAR_NAMES[y]}</button>`).join('');holder.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{selectedYear=Number(b.dataset.y);renderCourses()}))}
function renderCourses(){renderYearTabs();const search=(document.getElementById('courseSearch')?.value||'').trim().toLowerCase();const filtered=courses.filter(c=>Number(c.year)===selectedYear&&(`${c.title} ${c.description} ${c.category}`).toLowerCase().includes(search));document.getElementById('courseCount').textContent=`${filtered.length} مقرر في ${YEAR_NAMES[selectedYear]}`;document.getElementById('courseGrid').innerHTML=filtered.length?filtered.map((c,i)=>courseCard(c)).join(''):'<div class="empty-state">مفيش مقررات مطابقة للبحث حاليًا.</div>';document.querySelectorAll('[data-course]').forEach(b=>b.addEventListener('click',()=>openCourse(b.dataset.course)))}
function courseCard(c){return `<article class="course-card"><div class="course-card-top"><span class="course-icon">${Number(c.year)%2?'▤':'✎'}</span><span class="course-category">${escapeHTML(c.category||'مقرر تعليمي')}</span></div><h3>${escapeHTML(c.title)}</h3><p>${escapeHTML(c.description)}</p><div class="course-meta"><span>${(c.lessons||[]).length} دروس</span><button class="text-link" data-course="${escapeHTML(c.id)}">عرض المقرر ←</button></div></article>`}
function lessonDescription(title, course){
  const t=String(title).toLowerCase();
  if(/مفهوم|تعريف|نشأة|تطور/.test(t)) return `في الدرس ده هتتعرف على معنى ${title}، وأهميته في مجال الصحافة والإعلام، والمفاهيم الأساسية المرتبطة بيه. حاول في نهاية الدرس تكتب تعريفًا مختصرًا بأسلوبك وتذكر مثالًا من وسيلة إعلامية تعرفها.`;
  if(/عناصر الخبر|الخبر الصحفي|العنوان|المقدمة|الهرم المقلوب|صياغة|التحرير|الكتابة/.test(t)) return `الدرس بيركز على تحويل المعلومات إلى مادة صحفية واضحة. راجع دقة البيانات والأسماء والأرقام، وحدد أهم معلومة للقارئ، وبعدها رتب التفاصيل في شكل منطقي. التطبيق المقترح: اكتب عنوانًا ومقدمة قصيرة للموضوع، ثم راجعها واحذف التكرار والمبالغة.`;
  if(/مصادر|التحقق|الأدلة|الوثائق|شهادات|مقابلات/.test(t)) return `هتتعلم إزاي تجمع معلومات من مصادر مناسبة وتراجع مصداقيتها. قارن بين أكثر من مصدر مستقل، وارجع للمستند أو التصريح الأصلي قدر الإمكان، وسجل تاريخ الحصول على المعلومة. متعتبرش انتشار المعلومة دليلًا على صحتها.`;
  if(/أخلاقي|قانون|خصوصية|مسؤولية|حقوق|حق الرد|تضارب/.test(t)) return `الدرس بيناقش المسؤولية المهنية والقواعد اللي بتحافظ على حقوق الجمهور والأفراد. قيّم الموقف من حيث الدقة والإنصاف والخصوصية وحق الرد، واسأل نفسك: هل النشر ضروري؟ وهل المعلومات موثقة؟ وهل فيه ضرر ممكن تجنبه؟`;
  if(/بحث|منهج|استبيان|مقابلة|تحليل|بيانات|إحصاء/.test(t)) return `هتتعرف على خطوات التعامل المنهجي مع المعلومات: تحديد سؤال واضح، واختيار الأداة المناسبة، وجمع البيانات بطريقة منظمة، ثم تحليلها وعرض النتائج من غير تعميم غير مدعوم. التطبيق: اكتب سؤال بحث واحد وحدد نوع البيانات اللي تحتاجها للإجابة عنه.`;
  if(/تصوير|صورة|إضاءة|لقطة|فيديو|مونتاج|صوت/.test(t)) return `الدرس بيوضح إزاي تخدم الصورة أو المادة المرئية القصة الصحفية بدل ما تكون مجرد شكل. اهتم بالسياق، وجودة التسجيل، ووضوح الصوت، ودقة التعليق المصاحب. راعي خصوصية الأشخاص، ومتعدلش الصورة بطريقة تغير معنى الحدث.`;
  if(/إخراج|تصميم|صفحة|تكوين|توازن|بصري/.test(t)) return `هتدرس تنظيم العناصر على الصفحة أو الشاشة بحيث القارئ يفهم الأولويات بسهولة. راعي التسلسل البصري، والتباين، والمساحات البيضاء، وتناسق الخطوط والصور. اختبر التصميم: هل العين بتوصل للعنوان ثم للمعلومة الأساسية بشكل طبيعي؟`;
  if(/إدارة|تخطيط|مؤسسة|غرفة الأخبار|موارد|أداء/.test(t)) return `الدرس بيربط العمل الصحفي بإدارة الفريق والمؤسسة. هتتعرف على توزيع الأدوار، وتحديد الأولويات، ووضع جدول للتنفيذ، ومراجعة جودة المنتج النهائي. التطبيق المقترح: اعمل خطة بسيطة لتغطية حدث وحدد المسؤول عن كل مهمة.`;
  if(/مشروع|تدريب|ميداني|تقييم|عرض/.test(t)) return `في الجزء ده هتطبق اللي اتعلمته في مهمة عملية. حدد الهدف والجمهور، واكتب خطة تنفيذ ومواعيد واضحة، واحتفظ بملاحظاتك ومصادرك، وبعد التنفيذ راجع نقاط القوة والجوانب اللي محتاجة تحسين.`;
  if(/جمهور|اتصال|تأثير|رأي عام/.test(t)) return `الدرس بيساعدك تفهم علاقة الرسالة الإعلامية بالجمهور والسياق اللي بتوصل فيه. فكر في اختلاف احتياجات الجمهور وطرق استقبال الرسائل، وحاول تشرح المفهوم بمثال من خبر أو حملة إعلامية شاهدتها.`;
  return `الدرس جزء من مقرر «${course.title}». اقرأ المفهوم الأساسي، وحدد المصطلحات المهمة، واربطه بمثال صحفي واقعي. بعد المذاكرة، اكتب ملخصًا من 3 نقاط وسؤالًا واحدًا تحب تناقشه مع الدكتور.`;
}
function openCourse(id){
  const c=courseById(id);if(!c)return;
  const isEnrolled=(enrolled[currentUser?.email]||[]).includes(id);
  const resources=pdfAttachments.filter(f=>f.courseId===id);
  const courseQuizzes=teacherQuizzes.filter(q=>q.courseId===id);
  const resourceMarkup=resources.length?resources.map(f=>`<div class="resource-item"><div class="resource-file-icon">PDF</div><div class="resource-file-copy"><strong>${escapeHTML(f.title)}</strong><small>${escapeHTML(f.filename)} · ${formatFileSize(f.size)}</small></div><button class="btn btn-outline btn-small" data-open-pdf="${escapeHTML(f.id)}">فتح الملف</button></div>`).join(''):'<div class="empty-state">الدكتور لسه مضافش ملفات PDF للمقرر ده.</div>';
  const quizMarkup=courseQuizzes.length?courseQuizzes.map(q=>{const latest=quizAttempts.filter(a=>a.quizId===q.id&&a.studentEmail===currentUser?.email).sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt))[0];return `<div class="student-quiz-card"><div><strong>${escapeHTML(q.title)}</strong><small>${q.questions.length} أسئلة · ${escapeHTML(q.description||'اختبار للمقرر')}</small>${latest?`<span class="grade-inline">آخر درجة: ${latest.score}/${latest.total} (${latest.percentage}%)</span>`:''}</div><button class="btn btn-primary btn-small" data-take-quiz="${escapeHTML(q.id)}" ${currentUser?.role==='student'&&Number(currentUser.year)!==Number(q.year)?'disabled':''}>${latest?'إعادة الاختبار':'ابدأ الكويز'}</button></div>`}).join(''):'<div class="empty-state">مفيش كويزات منشورة للمقرر حتى الآن.</div>';
  document.getElementById('courseDetail').innerHTML=`<div class="detail-hero"><span class="section-kicker">${YEAR_NAMES[c.year]}</span><h1>${escapeHTML(c.title)}</h1><p>${escapeHTML(c.description)}</p></div><div class="detail-content"><div><h2 style="font-size:17px;margin:0 0 14px">محتوى المقرر</h2><div class="lesson-list">${(c.lessons||[]).map((l,i)=>`<details class="lesson-accordion"><summary><span class="lesson-index">${String(i+1).padStart(2,'0')}</span><span class="lesson-title"><strong>${escapeHTML(l)}</strong><small>اضغط لعرض شرح الدرس</small></span><span class="lesson-chevron">⌄</span></summary><div class="lesson-body"><p>${escapeHTML(lessonDescription(l,c))}</p><span>تطبيق مقترح: اكتب ملخصًا قصيرًا أو مثالًا من الواقع على الفكرة اللي اتعلمتها.</span></div></details>`).join('')}</div><section class="course-extra-section"><h2>ملفات المحاضرات</h2><p>المراجع والملفات اللي رفعها الدكتور للمقرر.</p>${currentUser?.role==='student'&&!isEnrolled?'<div class="access-hint">أضف المقرر إلى مكتبتك عشان تقدر تفتح الملفات وتحل الكويزات.</div>':resourceMarkup}</section><section class="course-extra-section"><h2>كويزات المقرر</h2><p>اختبارات قصيرة لتقييم فهمك للمحتوى.</p>${quizMarkup}</section></div><aside class="detail-side"><h3>عن المقرر</h3><p>الفرقة: ${YEAR_NAMES[c.year]}</p><p>التصنيف: ${escapeHTML(c.category||'مقرر تعليمي')}</p><p>عدد الدروس: ${(c.lessons||[]).length}</p><p>ملفات PDF: ${resources.length}</p><p>الكويزات: ${courseQuizzes.length}</p><button class="btn btn-primary" id="enrollCourseBtn">${isEnrolled?'تمت إضافة المقرر ✓':'أضف إلى مقرراتي +'}</button><button class="btn btn-outline" style="width:100%;margin-top:8px" id="coursePracticeBtn">تدرب على المعلومات</button></aside></div>`;
  document.getElementById('enrollCourseBtn').addEventListener('click',async()=>{if(!currentUser){openAuth('login');showToast('سجل دخولك الأول عشان تضيف المقرر');return}if(currentUser.role!=='student'){showToast('الإضافة لمقرراتي متاحة لحسابات الطلاب');return}const ids=enrolled[currentUser.email]||[];if(!ids.includes(id)){if(supabaseClient){const {error}=await supabaseClient.from('course_enrollments').insert({user_id:currentUser.id,course_id:id});if(error&&error.code!=='23505'){showToast('تعذر إضافة المقرر: '+error.message);return}}ids.push(id);enrolled[currentUser.email]=ids;save(STORAGE.enrolled,enrolled);showToast('تمت إضافة المقرر لمقرراتك')}else showToast('المقرر موجود بالفعل في مقرراتك');openCourse(id)});
  document.getElementById('coursePracticeBtn').addEventListener('click',()=>go('practice'));
  document.querySelectorAll('[data-open-pdf]').forEach(b=>b.addEventListener('click',()=>openPdfAttachment(b.dataset.openPdf)));
  document.querySelectorAll('[data-take-quiz]').forEach(b=>b.addEventListener('click',()=>startStudentQuiz(b.dataset.takeQuiz)));
  go('course-detail');
}
function renderDashboard(){
  if(!currentUser||currentUser.role!=='student'){openAuth('login');return}
  document.getElementById('dashboardName').textContent=currentUser.name.split(' ')[0];
  const select=document.getElementById('studentYearSelect');select.value=String(currentUser.year||1);select.disabled=!!supabaseClient;const year=Number(select.value);
  const myIds=enrolled[currentUser.email]||[];const myCourses=myIds.map(courseById).filter(Boolean);
  document.getElementById('dashboardStats').innerHTML=`<div class="dashboard-stat"><strong>${myCourses.length}</strong><span>مقررات اخترتها</span></div><div class="dashboard-stat"><strong>${myCourses.reduce((n,c)=>n+(c.lessons||[]).length,0)}</strong><span>دروس في مكتبتك</span></div><div class="dashboard-stat"><strong>${YEAR_NAMES[year]}</strong><span>فرقتك الحالية</span></div>`;
  const matching=myCourses.filter(c=>Number(c.year)===year);
  document.getElementById('myCoursesGrid').innerHTML=matching.length?matching.map(courseCard).join(''):'<div class="empty-state">لسه مفيش مقررات في مكتبتك للفرقة دي. ادخل على صفحة المقررات واختار اللي يناسبك.</div>';
  document.querySelectorAll('#myCoursesGrid [data-course]').forEach(b=>b.addEventListener('click',()=>openCourse(b.dataset.course)));
  renderStudentLearningTools(myCourses);
}
function renderDoctorDashboard(){
  if(!currentUser||currentUser.role!=='doctor'){openAuth('login');return}
  const mine=courses.filter(c=>c.createdBy===currentUser.email);
  document.getElementById('doctorCourseCount').textContent=mine.length;
  document.getElementById('doctorCoursesList').innerHTML=mine.length?mine.map(c=>`<div class="doctor-course-item"><div><strong>${escapeHTML(c.title)}</strong><small>${YEAR_NAMES[c.year]} · ${(c.lessons||[]).length} دروس</small></div><button class="delete-course" data-delete="${escapeHTML(c.id)}">حذف</button></div>`).join(''):'<div class="empty-state">لسه مضافش مقررات من الحساب ده.</div>';
  document.querySelectorAll('[data-delete]').forEach(b=>b.addEventListener('click',async()=>{if(!confirm('متأكد إنك عايز تحذف المقرر ده؟'))return;const removedId=b.dataset.delete;if(supabaseClient){const removePaths=pdfAttachments.filter(f=>f.courseId===removedId&&f.storagePath).map(f=>f.storagePath);if(removePaths.length){const {error:storageError}=await supabaseClient.storage.from('lecture-pdfs').remove(removePaths);if(storageError){showToast('تعذر حذف ملفات المقرر: '+storageError.message);return}}const {error}=await supabaseClient.from('courses').delete().eq('id',removedId);if(error){showToast('تعذر حذف المقرر: '+error.message);return}await loadSupabaseData();renderDoctorDashboard();renderHomeYears();showToast('تم حذف المقرر والمحتوى المرتبط بيه');return}const removedFiles=pdfAttachments.filter(f=>f.courseId===removedId);for(const file of removedFiles)await deletePdfBlob(file.id);pdfAttachments=pdfAttachments.filter(f=>f.courseId!==removedId);teacherQuizzes=teacherQuizzes.filter(q=>q.courseId!==removedId);const removedQuizIds=quizAttempts.filter(a=>!teacherQuizzes.some(q=>q.id===a.quizId)).map(a=>a.quizId);quizAttempts=quizAttempts.filter(a=>!removedQuizIds.includes(a.quizId));courses=courses.filter(c=>c.id!==removedId);save(STORAGE.courses,courses);save(STORAGE.pdfs,pdfAttachments);save(STORAGE.quizzes,teacherQuizzes);save(STORAGE.attempts,quizAttempts);renderDoctorDashboard();renderHomeYears();showToast('تم حذف المقرر والمحتوى المرتبط بيه')}));
  renderDoctorTools();
}

// PDF storage: IndexedDB keeps binary files out of localStorage's small text quota.
function openPdfDatabase(){
  if(!('indexedDB' in window))return Promise.reject(new Error('المتصفح لا يدعم تخزين الملفات محليًا.'));
  if(!pdfDatabasePromise)pdfDatabasePromise=new Promise((resolve,reject)=>{const req=indexedDB.open('journalism_academy_files',1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('pdfs'))db.createObjectStore('pdfs',{keyPath:'id'})};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('تعذر فتح مساحة الملفات.'))});
  return pdfDatabasePromise;
}
async function storePdfBlob(id,file){const db=await openPdfDatabase();return new Promise((resolve,reject)=>{const tx=db.transaction('pdfs','readwrite');tx.objectStore('pdfs').put({id,blob:file});tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||new Error('تعذر حفظ الملف.'))})}
async function readPdfBlob(id){const db=await openPdfDatabase();return new Promise((resolve,reject)=>{const tx=db.transaction('pdfs','readonly');const req=tx.objectStore('pdfs').get(id);req.onsuccess=()=>resolve(req.result?.blob||null);req.onerror=()=>reject(req.error)})}
async function deletePdfBlob(id){try{const db=await openPdfDatabase();await new Promise((resolve,reject)=>{const tx=db.transaction('pdfs','readwrite');tx.objectStore('pdfs').delete(id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)})}catch(error){console.warn(error)}}
function formatFileSize(bytes){if(!bytes)return 'حجم غير معروف';return bytes<1024*1024?`${Math.max(1,Math.round(bytes/1024))} كيلوبايت`:`${(bytes/1024/1024).toFixed(1)} ميجابايت`}
function ownedCourses(){return courses.filter(c=>c.createdBy===currentUser?.email)}
function fillDoctorCourseSelects(){
  const mine=supabaseClient?courses.filter(c=>c.createdBy===currentUser?.email||!c.createdBy):ownedCourses();
  const pdfSelect=document.getElementById('pdfCourseSelect');
  const oldPdf=pdfSelect.value;
  pdfSelect.innerHTML=mine.length?mine.map(c=>`<option value="${escapeHTML(c.id)}">${escapeHTML(c.title)} — ${YEAR_NAMES[c.year]}</option>`).join(''):'<option value="">أضف مقررًا أولًا</option>';
  pdfSelect.disabled=!mine.length;
  if(mine.some(c=>c.id===oldPdf))pdfSelect.value=oldPdf;
  fillQuizCourseSelect();
}
function fillQuizCourseSelect(){
  const select=document.getElementById('quizCourseSelect');
  const year=Number(document.getElementById('quizTargetYear')?.value||1);
  const matching=(supabaseClient?courses.filter(c=>c.createdBy===currentUser?.email||!c.createdBy):ownedCourses()).filter(c=>Number(c.year)===year);
  const old=select.value;
  select.innerHTML='<option value="">اختبار عام للفرقة بدون مقرر محدد</option>'+matching.map(c=>`<option value="${escapeHTML(c.id)}">${escapeHTML(c.title)}</option>`).join('');
  if(matching.some(c=>c.id===old))select.value=old;
}
function renderDoctorTools(){
  const gradeNote=document.querySelector('.gradebook-note');if(gradeNote)gradeNote.textContent=supabaseClient?'النتائج متزامنة من قاعدة البيانات عبر أجهزة الطلاب. اضغط تحديث النتائج لجلب أحدث المحاولات.':'الدرجات المعروضة محفوظة محليًا على نفس المتصفح في وضع التجربة.';
  fillDoctorCourseSelects();
  const mineIds=(supabaseClient?courses.filter(c=>c.createdBy===currentUser?.email||!c.createdBy):ownedCourses()).map(c=>c.id);
  const files=pdfAttachments.filter(f=>mineIds.includes(f.courseId));
  document.getElementById('doctorFileCount').textContent=files.length;
  document.getElementById('doctorFilesList').innerHTML=files.length?files.map(f=>{const c=courseById(f.courseId);return `<div class="doctor-course-item"><div><strong>${escapeHTML(f.title)}</strong><small>${escapeHTML(c?.title||'مقرر محذوف')} · ${formatFileSize(f.size)}</small></div><div class="item-actions"><button class="tiny-action" data-open-pdf="${escapeHTML(f.id)}">فتح</button><button class="delete-course" data-delete-pdf="${escapeHTML(f.id)}">حذف</button></div></div>`}).join(''):'<div class="empty-state">مفيش ملفات مرفوعة حتى الآن.</div>';
  document.querySelectorAll('#doctorFilesList [data-open-pdf]').forEach(b=>b.addEventListener('click',()=>openPdfAttachment(b.dataset.openPdf)));
  document.querySelectorAll('#doctorFilesList [data-delete-pdf]').forEach(b=>b.addEventListener('click',()=>removePdfAttachment(b.dataset.deletePdf)));
  const quizzes=teacherQuizzes.filter(q=>q.createdBy===currentUser.email);
  document.getElementById('doctorQuizCount').textContent=quizzes.length;
  document.getElementById('doctorQuizzesList').innerHTML=quizzes.length?quizzes.map(q=>{const c=courseById(q.courseId);const count=quizAttempts.filter(a=>a.quizId===q.id).length;return `<div class="doctor-course-item"><div><strong>${escapeHTML(q.title)}</strong><small>${escapeHTML(c?.title||('اختبار عام · '+YEAR_NAMES[q.year]))} · ${q.questions.length} أسئلة · ${count} تسليمات</small></div><button class="delete-course" data-delete-quiz="${escapeHTML(q.id)}">حذف</button></div>`}).join(''):'<div class="empty-state">لسه مفيش كويزات منشورة.</div>';
  document.querySelectorAll('#doctorQuizzesList [data-delete-quiz]').forEach(b=>b.addEventListener('click',()=>deleteTeacherQuiz(b.dataset.deleteQuiz)));
  renderDoctorGradebook();
  document.querySelectorAll('#doctorGradebook [data-grade-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#doctorGradebook [data-grade-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderDoctorGradeRows(b.dataset.gradeFilter)}));
  if(!document.querySelector('#quizQuestionsEditor .quiz-editor-question'))resetQuizQuestionEditor();
}
async function handlePdfUploadLocal(event){
  event.preventDefault();
  const form=event.currentTarget;const data=new FormData(form);const course=courseById(String(data.get('courseId')));const file=data.get('pdfFile');const msg=document.getElementById('pdfUploadMessage');msg.textContent='';
  if(!course||course.createdBy!==currentUser?.email){msg.textContent='اختار مقررًا من المقررات اللي أضفتها.';return}
  if(!(file instanceof File)||!file.size){msg.textContent='اختار ملف PDF صالح.';return}
  if(!(file.type==='application/pdf'||file.name.toLowerCase().endsWith('.pdf'))){msg.textContent='نوع الملف غير صحيح. ارفع ملف PDF فقط.';return}
  if(file.size>20*1024*1024){msg.textContent='حجم الملف أكبر من 20 ميجابايت.';return}
  const id='pdf'+Date.now()+Math.random().toString(36).slice(2,7);
  try{await storePdfBlob(id,file);pdfAttachments.push({id,courseId:course.id,title:String(data.get('title')).trim()||file.name,filename:file.name,size:file.size,uploadedBy:currentUser.email,createdAt:new Date().toISOString()});save(STORAGE.pdfs,pdfAttachments);form.reset();msg.textContent='تم رفع ملف المحاضرة بنجاح.';renderDoctorTools();showToast('تم رفع ملف PDF للمقرر')}catch(error){console.error(error);msg.textContent=error.message||'حصلت مشكلة أثناء رفع الملف.'}
}
async function openPdfAttachmentLocal(id){
  const meta=pdfAttachments.find(f=>f.id===id);if(!meta){showToast('الملف مش موجود');return}
  if(!currentUser){openAuth('login');showToast('سجل دخولك عشان تفتح ملفات المقررات');return}
  if(currentUser.role==='student'&&!(enrolled[currentUser.email]||[]).includes(meta.courseId)){showToast('أضف المقرر لمكتبتك الأول عشان تفتح الملف');return}
  if(currentUser.role==='doctor'&&meta.uploadedBy!==currentUser.email){showToast('تقدر تفتح الملفات اللي رفعتها من حسابك فقط');return}
  const popup=window.open('about:blank','_blank');
  try{const blob=await readPdfBlob(id);if(!blob)throw new Error('ملف الـPDF غير موجود في مساحة التخزين.');const url=URL.createObjectURL(blob);if(popup){popup.location.href=url;setTimeout(()=>URL.revokeObjectURL(url),120000)}else{const a=document.createElement('a');a.href=url;a.download=meta.filename||'lecture.pdf';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000)}}catch(error){if(popup)popup.close();console.error(error);showToast(error.message||'تعذر فتح الملف')}
}
async function removePdfAttachmentLocal(id){const file=pdfAttachments.find(f=>f.id===id);if(!file||file.uploadedBy!==currentUser?.email)return;if(!confirm('تحذف ملف الـPDF ده؟'))return;await deletePdfBlob(id);pdfAttachments=pdfAttachments.filter(f=>f.id!==id);save(STORAGE.pdfs,pdfAttachments);renderDoctorTools();showToast('تم حذف الملف')}
function quizQuestionMarkup(index){return `<div class="quiz-editor-question" data-question-index="${index}"><div class="quiz-editor-question-head"><strong>السؤال ${index+1}</strong><button class="delete-course" type="button" data-remove-question="${index}">حذف السؤال</button></div><label>نص السؤال<input name="question_${index}" type="text" placeholder="اكتب السؤال هنا" required maxlength="400"></label><div class="quiz-options-editor">${[0,1,2,3].map(n=>`<label>اختيار ${['أ','ب','ج','د'][n]}<input name="option_${index}_${n}" type="text" placeholder="نص الاختيار" required maxlength="250"></label>`).join('')}</div><label>الإجابة الصحيحة<select name="correct_${index}"><option value="0">الاختيار أ</option><option value="1">الاختيار ب</option><option value="2">الاختيار ج</option><option value="3">الاختيار د</option></select></label></div>`}
function resetQuizQuestionEditor(){document.getElementById('quizQuestionsEditor').innerHTML=quizQuestionMarkup(0);wireQuestionRemoveButtons()}
function addQuizEditorQuestion(){const editor=document.getElementById('quizQuestionsEditor');const index=editor.querySelectorAll('.quiz-editor-question').length;editor.insertAdjacentHTML('beforeend',quizQuestionMarkup(index));wireQuestionRemoveButtons()}
function wireQuestionRemoveButtons(){document.querySelectorAll('[data-remove-question]').forEach(b=>{b.onclick=()=>{const list=document.getElementById('quizQuestionsEditor');if(list.querySelectorAll('.quiz-editor-question').length<=1){showToast('لازم يكون فيه سؤال واحد على الأقل');return}b.closest('.quiz-editor-question').remove();[...list.querySelectorAll('.quiz-editor-question')].forEach((node,i)=>{const temp=document.createElement('div');temp.innerHTML=quizQuestionMarkup(i);const replacement=temp.firstElementChild;for(const field of node.querySelectorAll('input,select')){const target=replacement.querySelector(`[name="${field.name}"]`);if(target)target.value=field.value}node.replaceWith(replacement)});wireQuestionRemoveButtons()}})}
function handleCreateQuizLocal(event){
  event.preventDefault();const form=event.currentTarget;const data=new FormData(form);const course=courseById(String(data.get('courseId')));const message=document.getElementById('quizCreateMessage');message.textContent='';
  const targetYear=Number(data.get('year'));
  if(!YEAR_NAMES[targetYear]){message.textContent='اختار الفرقة المستهدفة.';return}
  if(course&&(course.createdBy!==currentUser?.email||Number(course.year)!==targetYear)){message.textContent='المقرر لازم يكون من مقرراتك وفي نفس الفرقة المحددة.';return}
  const questionNodes=[...document.querySelectorAll('#quizQuestionsEditor .quiz-editor-question')];const questions=[];
  for(let i=0;i<questionNodes.length;i++){const q=String(data.get(`question_${i}`)||'').trim();const opts=[0,1,2,3].map(n=>String(data.get(`option_${i}_${n}`)||'').trim());if(!q||opts.some(x=>!x)){message.textContent=`راجع السؤال رقم ${i+1} واكتب نص السؤال والاختيارات الأربعة.`;return}questions.push({q,opts,a:Number(data.get(`correct_${i}`))})}
  const quiz={id:'quiz'+Date.now(),courseId:course?.id||null,year:targetYear,title:String(data.get('title')).trim(),description:String(data.get('description')||'').trim(),createdBy:currentUser.email,questions,createdAt:new Date().toISOString()};
  if(!quiz.title){message.textContent='اكتب اسم الكويز.';return}teacherQuizzes.push(quiz);save(STORAGE.quizzes,teacherQuizzes);form.reset();resetQuizQuestionEditor();message.textContent=`تم نشر الكويز لطلاب ${YEAR_NAMES[targetYear]} بنجاح.`;renderDoctorTools();showToast('تم نشر الكويز بنجاح');
}
function deleteTeacherQuizLocal(id){const quiz=teacherQuizzes.find(q=>q.id===id);if(!quiz||quiz.createdBy!==currentUser?.email)return;if(!confirm('حذف الكويز وكل محاولاته المسجلة؟'))return;teacherQuizzes=teacherQuizzes.filter(q=>q.id!==id);quizAttempts=quizAttempts.filter(a=>a.quizId!==id);save(STORAGE.quizzes,teacherQuizzes);save(STORAGE.attempts,quizAttempts);renderDoctorTools();showToast('تم حذف الكويز')}
function renderDoctorGradebook(){
  const quizzes=teacherQuizzes.filter(q=>q.createdBy===currentUser?.email);const attempts=quizAttempts.filter(a=>quizzes.some(q=>q.id===a.quizId)).sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt));
  const holder=document.getElementById('doctorGradebook');
  if(!attempts.length){holder.innerHTML='<div class="gradebook-empty-guide"><strong>درجات طلابك هتظهر هنا تلقائيًا</strong><p>انشر كويز لفرقة معينة، وخلي طالب من نفس الفرقة يسجل دخوله ويحله. هتلاقي اسمه ودرجته وتاريخ التسليم في الجدول ده.</p></div>';return}
  const avg=Math.round(attempts.reduce((sum,a)=>sum+Number(a.percentage||0),0)/attempts.length);
  const students=new Set(attempts.map(a=>a.studentEmail)).size;
  holder.innerHTML=`<div class="gradebook-summary"><div><strong>${attempts.length}</strong><span>إجمالي المحاولات</span></div><div><strong>${students}</strong><span>طلاب شاركوا</span></div><div><strong>${avg}%</strong><span>متوسط الدرجات</span></div></div><div class="grade-filter-row"><button class="grade-filter active" data-grade-filter="all">كل الدرجات (${attempts.length})</button>${[1,2,3,4].map(y=>`<button class="grade-filter" data-grade-filter="year-${y}">${YEAR_NAMES[y]}</button>`).join('')}${quizzes.map(q=>`<button class="grade-filter" data-grade-filter="${escapeHTML(q.id)}">${escapeHTML(q.title)}</button>`).join('')}</div><div id="doctorGradeRows"></div>`;
  renderDoctorGradeRows('all');
}
function renderDoctorGradeRows(filter){
  const quizzes=teacherQuizzes.filter(q=>q.createdBy===currentUser?.email);const rows=quizAttempts.filter(a=>quizzes.some(q=>q.id===a.quizId)&&(filter==='all'||(String(filter).startsWith('year-')?Number(a.year)===Number(String(filter).slice(5)):a.quizId===filter))).sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt));const holder=document.getElementById('doctorGradeRows');if(!holder)return;
  holder.innerHTML=rows.length?`<div class="grade-table-wrap"><table class="grade-table"><thead><tr><th>اسم الطالب</th><th>الفرقة</th><th>الكويز / المقرر</th><th>الدرجة</th><th>النسبة</th><th>تاريخ التسليم</th></tr></thead><tbody>${rows.map(a=>{const q=teacherQuizzes.find(x=>x.id===a.quizId);const c=courseById(a.courseId);const student=users.find(u=>u.email===a.studentEmail);return `<tr><td><strong>${escapeHTML(a.studentName||student?.name||'طالب')}</strong><small>${escapeHTML(a.studentEmail)}</small></td><td>${YEAR_NAMES[a.year]||'—'}</td><td>${escapeHTML(q?.title||'كويز')}<small>${escapeHTML(c?.title||'اختبار عام للفرقة')}</small></td><td>${a.score} / ${a.total}</td><td><span class="grade-pill ${a.percentage>=50?'pass':'fail'}">${a.percentage}%</span></td><td>${new Date(a.submittedAt).toLocaleString('ar-EG')}</td></tr>`}).join('')}</tbody></table></div>`:'<div class="empty-state">مفيش درجات للكويز ده حتى الآن.</div>';
}
function exportTeacherGrades(){const quizzes=teacherQuizzes.filter(q=>q.createdBy===currentUser?.email);const attempts=quizAttempts.filter(a=>quizzes.some(q=>q.id===a.quizId));if(!attempts.length){showToast('مفيش درجات لتصديرها حتى الآن');return}const rows=[['اسم الطالب','البريد الإلكتروني','الفرقة','اسم الكويز','المقرر','الدرجة','من','النسبة المئوية','تاريخ التسليم']];attempts.forEach(a=>{const q=teacherQuizzes.find(x=>x.id===a.quizId);const c=courseById(a.courseId);rows.push([a.studentName,a.studentEmail,YEAR_NAMES[a.year]||'',q?.title||'',c?.title||'اختبار عام للفرقة',a.score,a.total,a.percentage+'%',new Date(a.submittedAt).toLocaleString('ar-EG')])});const csv='\ufeff'+rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='journalism-academy-grades.csv';a.click();URL.revokeObjectURL(url)}
function renderStudentLearningTools(myCourses){
  const studentYear=Number(currentUser?.year||1);const available=teacherQuizzes.filter(q=>Number(q.year)===studentYear);const list=document.getElementById('studentQuizzes');
  list.innerHTML=available.length?available.map(q=>{const c=courseById(q.courseId);const latest=quizAttempts.filter(a=>a.quizId===q.id&&a.studentEmail===currentUser.email).sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt))[0];return `<div class="student-quiz-card"><div><strong>${escapeHTML(q.title)}</strong><small>${escapeHTML(c?.title||'اختبار عام للفرقة')} · ${YEAR_NAMES[q.year]} · ${q.questions.length} أسئلة</small></div><div class="student-quiz-card-actions">${latest?`<span class="grade-pill ${latest.percentage>=50?'pass':'fail'}">${latest.percentage}%</span>`:'<span class="pending-pill">لم يتم الحل</span>'}<button class="btn btn-primary btn-small" data-take-quiz="${escapeHTML(q.id)}">${latest?'إعادة المحاولة':'ابدأ الكويز'}</button></div></div>`}).join(''):'<div class="empty-state">مفيش اختبارات متاحة لفرقتك حاليًا. لما الدكتور ينشر اختبار للفرقة بتاعتك، هتلاقيه هنا.</div>';
  list.querySelectorAll('[data-take-quiz]').forEach(b=>b.addEventListener('click',()=>startStudentQuiz(b.dataset.takeQuiz)));
  const mine=quizAttempts.filter(a=>a.studentEmail===currentUser.email).sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt));
  document.getElementById('studentGrades').innerHTML=mine.length?mine.map(a=>{const q=teacherQuizzes.find(x=>x.id===a.quizId);const c=courseById(a.courseId);return `<div class="grade-row"><div><strong>${escapeHTML(q?.title||'كويز')}</strong><small>${escapeHTML(c?.title||'اختبار عام للفرقة')} · ${new Date(a.submittedAt).toLocaleString('ar-EG')}</small></div><span class="grade-pill ${a.percentage>=50?'pass':'fail'}">${a.score}/${a.total} · ${a.percentage}%</span></div>`}).join(''):'<div class="empty-state">لسه مفيش درجات مسجلة. ابدأ بحل أول كويز من مقرراتك.</div>';
}
function startStudentQuiz(id){
  const quiz=teacherQuizzes.find(q=>q.id===id);if(!quiz)return;if(!currentUser){openAuth('login');showToast('سجل دخولك كطالب عشان تحل الكويز');return}if(currentUser.role!=='student'){showToast('حل الكويزات متاح من حساب الطالب');return}if(Number(currentUser.year||1)!==Number(quiz.year)){showToast('الاختبار مخصص لفرقة دراسية مختلفة');return}
  const course=courseById(quiz.courseId);document.getElementById('studentQuizTitle').textContent=quiz.title;document.getElementById('studentQuizDescription').textContent=`${course?.title||'اختبار عام'} · ${YEAR_NAMES[quiz.year]} · ${quiz.questions.length} أسئلة · ${quiz.description||'اختار إجابة واحدة لكل سؤال.'}`;
  document.getElementById('studentQuizContent').innerHTML=`<form id="studentQuizForm">${quiz.questions.map((q,i)=>`<div class="quiz-question"><h3>${i+1}. ${escapeHTML(q.q)}</h3>${q.opts.map((option,j)=>`<label class="quiz-option"><input type="radio" name="question_${i}" value="${j}" required><span>${escapeHTML(option)}</span></label>`).join('')}</div>`).join('')}<button class="btn btn-primary btn-block" type="submit">تسليم الاختبار ومعرفة الدرجة</button><p class="form-note" id="studentQuizMessage" role="status"></p></form>`;
  document.getElementById('studentQuizForm').addEventListener('submit',e=>submitTeacherQuiz(e,quiz));document.getElementById('studentQuizModal').classList.remove('hidden');
}
function submitTeacherQuizLocal(event,quiz){
  event.preventDefault();const data=new FormData(event.currentTarget);const answers=[];let score=0;quiz.questions.forEach((q,i)=>{const selected=data.get(`question_${i}`);if(selected===null){answers.push(null);return}const value=Number(selected);answers.push(value);if(value===q.a)score++});if(answers.some(a=>a===null)){document.getElementById('studentQuizMessage').textContent='جاوب على كل الأسئلة الأول.';return}
  const course=courseById(quiz.courseId);const attempt={id:'attempt'+Date.now(),quizId:quiz.id,courseId:quiz.courseId,studentName:currentUser.name,studentEmail:currentUser.email,year:Number(quiz.year||currentUser.year||course?.year||1),score,total:quiz.questions.length,percentage:Math.round(score/quiz.questions.length*100),answers,submittedAt:new Date().toISOString()};quizAttempts.push(attempt);save(STORAGE.attempts,quizAttempts);
  const holder=document.getElementById('studentQuizContent');holder.innerHTML=`<div class="quiz-finished"><span class="quiz-finished-icon">✓</span><h3>تم تسليم الكويز بنجاح</h3><strong>${score} من ${quiz.questions.length}</strong><span class="grade-pill ${attempt.percentage>=50?'pass':'fail'}">${attempt.percentage}%</span><p>${attempt.percentage>=85?'ممتاز! استمر على المستوى ده.':attempt.percentage>=50?'نتيجة كويسة، راجع الأسئلة اللي محتاجة مراجعة.':'راجع الدروس وحاول مرة تانية.'}</p><div class="answer-review">${quiz.questions.map((q,i)=>`<p><b>${i+1}. ${escapeHTML(q.q)}</b><small class="${answers[i]===q.a?'correct-answer':'wrong-answer'}">${answers[i]===q.a?'إجابة صحيحة':'الإجابة الصحيحة: '+escapeHTML(q.opts[q.a])}</small></p>`).join('')}</div><button class="btn btn-primary btn-block" type="button" id="finishStudentQuiz">إغلاق</button></div>`;
  document.getElementById('finishStudentQuiz').addEventListener('click',closeStudentQuiz);renderStudentLearningTools((enrolled[currentUser.email]||[]).map(courseById).filter(Boolean));showToast('اتسجلت درجتك عند الدكتور');
}
function closeStudentQuiz(){document.getElementById('studentQuizModal').classList.add('hidden')}
function updateHeader(){const chip=document.getElementById('userChip');const login=document.getElementById('loginBtn');const register=document.getElementById('registerBtn');if(currentUser){chip.textContent=currentUser.role==='doctor'?'د. '+currentUser.name.split(' ')[0]:currentUser.name.split(' ')[0];chip.classList.remove('hidden');login.textContent='لوحتي';register.textContent='تسجيل الخروج';}else{chip.classList.add('hidden');login.textContent='تسجيل الدخول';register.textContent='إنشاء حساب'}}
function openAuth(mode='login'){authMode=mode;document.getElementById('authModal').classList.remove('hidden');document.getElementById('authMessage').textContent='';setAuthMode(mode)}
function closeAuth(){document.getElementById('authModal').classList.add('hidden')}
function setAuthMode(mode){authMode=mode;document.querySelectorAll('.auth-tab').forEach(b=>b.classList.toggle('active',b.dataset.authMode===mode));document.getElementById('authTitle').textContent=mode==='login'?'نورت الأكاديمية':'اعمل حسابك دلوقتي';document.getElementById('authSubtitle').textContent=mode==='login'?'سجل دخولك عشان توصل لمساحتك التعليمية.':'اختار نوع حسابك وابدأ رحلتك التعليمية.';document.getElementById('authName').parentElement.classList.toggle('hidden',mode==='login');document.getElementById('authYearLabel').classList.toggle('hidden',mode==='login'||document.getElementById('authRole').value==='doctor');document.getElementById('authSubmit').textContent=mode==='login'?'دخول':'إنشاء الحساب';document.getElementById('authForm').querySelector('[name="password"]').autocomplete=mode==='login'?'current-password':'new-password'}
async function hashPassword(password){if(window.crypto?.subtle){const bytes=new TextEncoder().encode(password);const hash=await crypto.subtle.digest('SHA-256',bytes);return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('')}return password}
async function handleAuthLocal(event){event.preventDefault();const form=event.currentTarget;const data=new FormData(form);const role=data.get('role');const email=String(data.get('email')).trim().toLowerCase();const password=String(data.get('password'));const msg=document.getElementById('authMessage');msg.textContent='';const passwordHash=await hashPassword(password);if(authMode==='register'){const name=String(data.get('name')).trim();if(name.length<2){msg.textContent='اكتب اسمك بشكل صحيح.';return}if(users.some(u=>u.email===email)){msg.textContent='البريد ده مسجل قبل كده. سجل دخولك.';return}const user={name,email,role,year:role==='student'?Number(data.get('year')):null,passwordHash};users.push(user);save(STORAGE.users,users);currentUser={name,email,role,year:user.year};save(STORAGE.session,currentUser);showToast('تم إنشاء الحساب بنجاح');closeAuth();afterLogin();return}const user=users.find(u=>u.email===email&&u.passwordHash===passwordHash&&u.role===role);if(!user){msg.textContent='بيانات الدخول مش صحيحة، راجع البريد وكلمة المرور ونوع الحساب.';return}currentUser={name:user.name,email:user.email,role:user.role,year:user.year};save(STORAGE.session,currentUser);showToast('تم تسجيل الدخول بنجاح');closeAuth();afterLogin()}
function afterLogin(){updateHeader();if(currentUser.role==='student')go('dashboard');else go('doctor')}
function logoutLocal(){currentUser=null;localStorage.removeItem(STORAGE.session);updateHeader();go('home');showToast('تم تسجيل الخروج')}
function renderPractice(){const area=document.getElementById('practiceMain');document.querySelectorAll('.practice-type').forEach(b=>b.classList.toggle('active',b.dataset.practice===activePractice));if(activePractice==='quiz'){area.innerHTML=`<h2>اختبار أساسيات الصحافة</h2><p>جاوب على الأسئلة دي، وبعد ما تخلص اضغط «صحح الإجابات» عشان تشوف نتيجتك والتفسير.</p><form id="quizForm">${QUIZ.map((q,i)=>`<div class="quiz-question"><h3>${i+1}. ${q.q}</h3>${q.opts.map((o,j)=>`<label class="quiz-option"><input type="radio" name="q${i}" value="${j}" ${quizSubmitted?'disabled':''}><span>${escapeHTML(o)}</span></label>`).join('')}</div>`).join('')}<div class="quiz-actions"><button class="btn btn-primary" type="submit" ${quizSubmitted?'disabled':''}>صحح الإجابات</button><button class="btn btn-outline" type="button" id="resetQuiz">إعادة الاختبار</button></div><div id="quizResult"></div></form>`;document.getElementById('quizForm').addEventListener('submit',submitQuiz);document.getElementById('resetQuiz').addEventListener('click',()=>{quizSubmitted=false;renderPractice()});if(quizSubmitted)showQuizResult()}else{area.innerHTML=`<h2>تحدي كتابة خبر صحفي</h2><p>تدريب بسيط على ترتيب المعلومات وصياغة مقدمة خبرية واضحة.</p><div class="writing-prompt"><strong>الموقف الصحفي</strong><p>نظمت كلية الإعلام ندوة بعنوان «مستقبل الصحافة الرقمية» يوم الثلاثاء، بحضور 150 طالبًا وعضو هيئة تدريس، وناقشت الندوة تأثير الذكاء الاصطناعي على غرف الأخبار. وصرح عميد الكلية أن الكلية ستطلق ورش تدريبية للطلاب خلال الفصل الدراسي القادم.</p><strong>المطلوب</strong><p>اكتب مقدمة خبرية من سطرين تقريبًا، وابدأ بأهم معلومة عندك.</p></div><textarea class="writing-area" id="writingAnswer" rows="5" placeholder="اكتب المقدمة الخبرية هنا..."></textarea><div class="quiz-actions"><button class="btn btn-primary" id="reviewWriting">راجع إجابتي</button><span class="field-hint">مراجعة إرشادية وليست تصحيحًا آليًا بالذكاء الاصطناعي.</span></div><div id="writingFeedback" class="writing-feedback"></div>`;document.getElementById('reviewWriting').addEventListener('click',reviewWriting)}}
function submitQuiz(e){e.preventDefault();const data=new FormData(e.currentTarget);let score=0;QUIZ.forEach((q,i)=>{if(Number(data.get('q'+i))===q.a)score++});quizSubmitted=true;renderPractice();const result=document.getElementById('quizResult');result.dataset.score=score;showQuizResult(score)}
function showQuizResult(scoreArg){const form=document.getElementById('quizForm');if(!form)return;let score=scoreArg;if(score===undefined){const old=document.getElementById('quizResult');score=Number(old?.dataset.score||0)}const result=document.getElementById('quizResult');result.className='quiz-result';result.innerHTML=`<strong>نتيجتك: ${score} من ${QUIZ.length}</strong><div style="margin-top:8px">${QUIZ.map((q,i)=>`<p style="margin:6px 0;font-size:9px"><b>${i+1}.</b> ${q.why}</p>`).join('')}</div>`;form.querySelectorAll('input').forEach(input=>input.disabled=true);form.querySelectorAll('.quiz-actions button[type="submit"]').forEach(b=>b.disabled=true)}
function reviewWriting(){const answer=document.getElementById('writingAnswer').value.trim();const feedback=document.getElementById('writingFeedback');if(answer.length<25){feedback.textContent='حاول تكتب مقدمة من جملتين على الأقل، وتضمّن أهم تفاصيل الحدث.';return}const hasWho=/طلاب|كلية|عميد|حضور/.test(answer);const hasWhat=/ندوة|الصحافة الرقمية|الذكاء الاصطناعي/.test(answer);const hasWhen=/الثلاثاء|الفصل الدراسي|القادم/.test(answer);feedback.textContent=`مراجعة إرشادية: ${hasWhat?'ذكرت موضوع الحدث بشكل واضح.':'حاول توضح موضوع الندوة في بداية المقدمة.'} ${hasWho?'أشرت إلى أطراف الحدث.':'وضح مين الجهة المنظمة أو مين شارك في الحدث.'} ${hasWhen?'أضفت معلومة زمنية.':'راجع إذا كان توقيت الحدث مهمًا في المقدمة.'} راجع كمان إن الجملة تبدأ بالأهم وتكون دقيقة ومختصرة.`}
function assistantAnswer(question){const q=question.toLowerCase();if(/عناصر الخبر|عناصر الخبر الصحفي|5 wh|من؟|ماذا/.test(q))return 'عناصر الخبر الأساسية غالبًا بتتجمع في الأسئلة الستة: من؟ ماذا؟ متى؟ أين؟ لماذا؟ وكيف؟ مش لازم كل خبر يجاوب عنها بنفس الترتيب، لكن لازم يقدم المعلومات الضرورية للقارئ بوضوح.';if(/الهرم المقلوب|مقلوب/.test(q))return 'الهرم المقلوب طريقة لتنظيم الخبر: تبدأ بأهم معلومة في المقدمة، وبعدها تضيف التفاصيل المهمة، ثم الخلفية والمعلومات الأقل أهمية. مثال: إعلان نتيجة مهمة يبدأ بالنتيجة نفسها، وبعدها تفاصيل الإعلان وسياقه.';if(/مقابلة|حوار صحفي/.test(q))return 'لإجراء مقابلة صحفية: حدد هدفك، وابحث عن خلفية الضيف، وجهز أسئلة مفتوحة، وابدأ بالأسئلة العامة ثم المتخصصة، واستمع كويس للردود، وسجل أو دوّن بعد موافقة الضيف، وبعدها راجع الاقتباسات والسياق قبل النشر.';if(/مصادر|تحقق|تأكد|شائعة|معلومة/.test(q))return 'للتحقق من معلومة: ارجع للمصدر الأصلي، وقارنها بمصدر مستقل موثوق، وافحص تاريخ ومكان الصورة أو الفيديو، وابحث عن أدلة داعمة، واطلب رد الطرف المعني. متعتمدش على إعادة النشر باعتبارها دليل.';if(/عنوان|عناوين/.test(q))return 'العنوان الصحفي الجيد واضح ومحدد ويعبر عن أهم زاوية في الموضوع. تجنب المبالغة أو إخفاء معلومة أساسية، واستخدم كلمات دقيقة تعكس مضمون الخبر فعلًا.';if(/تحقيق/.test(q))return 'التحقيق الصحفي بيبدأ بسؤال أو مشكلة تستحق البحث. حدد فرضية، واجمع وثائق وشهادات من أطراف مختلفة، وتحقق من الأدلة، وامنح الأطراف المعنية فرصة للرد، ثم اعرض النتائج بسياق واضح.';if(/أخلاقي|موضوعي|خصوصية|حق الرد/.test(q))return 'من أهم قواعد أخلاقيات الصحافة: الدقة، والإنصاف، والفصل بين الخبر والرأي، واحترام الخصوصية، وتجنب تضارب المصالح، وتصحيح الأخطاء بوضوح، وإتاحة حق الرد.';if(/تقرير/.test(q))return 'التقرير الصحفي بيشرح حدث أو قضية بتفاصيل وسياق أوسع من الخبر القصير. ابدأ بمدخل جذاب، ثم اعرض خلفية الموضوع وشهادات ومعلومات موثقة، ونظم التفاصيل في تسلسل مفهوم.';return 'سؤال مهم. عشان تذاكر الموضوع صح، ابدأ بتعريف المفهوم، وبعدها اعرف عناصره وخصائصه، وشوف مثالًا صحفيًا حقيقيًا، ثم حاول تطبق بنفسك. ممكن تحددلي اسم المصطلح أو المقرر عشان أوجهك بشكل أدق؟'}
function addChatMessage(text,who){const area=document.getElementById('chatArea');const item=document.createElement('div');item.className='chat-message '+who;const avatar=document.createElement('span');avatar.className='chat-avatar';avatar.textContent=who==='bot'?'JA':'أنت';const body=document.createElement('div');const p=document.createElement('p');p.textContent=text;const small=document.createElement('small');small.textContent=who==='bot'?'المساعد التجريبي':'أنت';body.append(p,small);item.append(avatar,body);area.appendChild(item);area.scrollTop=area.scrollHeight}
function sendChat(text){const value=text.trim();if(!value)return;addChatMessage(value,'user');document.getElementById('chatInput').value='';setTimeout(()=>addChatMessage(assistantAnswer(value),'bot'),250)}

// Navigation and shared actions
function enterDoctorArea(){if(currentUser?.role==='doctor'){go('doctor');return}if(currentUser?.role==='student'){showToast('سجل الخروج من حساب الطالب أولًا، ثم افتح مساحة الدكاترة وأنشئ حساب دكتور');return}openAuth('register');document.getElementById('authRole').value='doctor';setAuthMode('register')}
document.querySelectorAll('.nav-link:not(#doctorNavBtn)').forEach(b=>b.addEventListener('click',()=>go(b.dataset.page)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
document.getElementById('menuBtn').addEventListener('click',()=>document.getElementById('mainNav').classList.toggle('open'));
document.getElementById('loginBtn').addEventListener('click',()=>{if(currentUser)go(currentUser.role==='doctor'?'doctor':'dashboard');else openAuth('login')});
document.getElementById('registerBtn').addEventListener('click',()=>{if(currentUser)logout();else openAuth('register')});
document.getElementById('heroLogin').addEventListener('click',()=>openAuth('register'));
document.getElementById('doctorCta').addEventListener('click',enterDoctorArea);
document.getElementById('doctorNavBtn').addEventListener('click',enterDoctorArea);
document.querySelectorAll('[data-doctor-jump]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.doctorJump)?.scrollIntoView({behavior:'smooth',block:'start'})));
document.getElementById('quizTargetYear').addEventListener('change',fillQuizCourseSelect);
document.getElementById('closeAuth').addEventListener('click',closeAuth);
document.getElementById('authModal').addEventListener('click',e=>{if(e.target.id==='authModal')closeAuth()});
document.querySelectorAll('.auth-tab').forEach(b=>b.addEventListener('click',()=>setAuthMode(b.dataset.authMode)));
document.getElementById('authRole').addEventListener('change',()=>{document.getElementById('authYearLabel').classList.toggle('hidden',authMode==='login'||document.getElementById('authRole').value==='doctor')});
document.getElementById('authForm').addEventListener('submit',handleAuth);
document.getElementById('courseSearch').addEventListener('input',renderCourses);
document.getElementById('studentYearSelect').addEventListener('change',e=>{currentUser.year=Number(e.target.value);save(STORAGE.session,currentUser);const user=users.find(u=>u.email===currentUser.email);if(user){user.year=currentUser.year;save(STORAGE.users,users)}renderDashboard()});
document.getElementById('addCourseForm').addEventListener('submit',async e=>{e.preventDefault();if(!currentUser||currentUser.role!=='doctor'){showToast('سجل دخول بحساب دكتور معتمد الأول');return}const fd=new FormData(e.currentTarget);const lessons=String(fd.get('lessons')).split('\n').map(s=>s.trim()).filter(Boolean);if(!lessons.length){document.getElementById('doctorFormMessage').textContent='اكتب درس واحد على الأقل.';return}const course={id:supabaseClient?('course-'+crypto.randomUUID()):'u'+Date.now(),year:Number(fd.get('year')),title:String(fd.get('title')).trim(),category:String(fd.get('category')),description:String(fd.get('description')).trim(),lessons,createdBy:currentUser.email};if(supabaseClient){const {error}=await supabaseClient.from('courses').insert({id:course.id,year:course.year,title:course.title,category:course.category,description:course.description,lessons:course.lessons,created_by:currentUser.id});if(error){document.getElementById('doctorFormMessage').textContent='تعذر نشر المقرر: '+error.message;return}}courses.push(course);if(!supabaseClient)save(STORAGE.courses,courses);e.currentTarget.reset();document.getElementById('doctorFormMessage').textContent='تمت إضافة المقرر بنجاح، وهيظهر للطلاب في صفحة المقررات.';renderDoctorDashboard();renderHomeYears();showToast('تم نشر المقرر على المنصة')});
document.querySelectorAll('.practice-type').forEach(b=>b.addEventListener('click',()=>{activePractice=b.dataset.practice;quizSubmitted=false;renderPractice()}));
document.getElementById('chatForm').addEventListener('submit',e=>{e.preventDefault();sendChat(document.getElementById('chatInput').value)});
document.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>sendChat(b.dataset.prompt)));
document.getElementById('pdfUploadForm').addEventListener('submit',handlePdfUpload);
document.getElementById('createQuizForm').addEventListener('submit',handleCreateQuiz);
document.getElementById('addQuizQuestion').addEventListener('click',addQuizEditorQuestion);
document.getElementById('exportGradesBtn').addEventListener('click',exportTeacherGrades);
document.getElementById('refreshGradesBtn').addEventListener('click',async()=>{if(supabaseClient){const b=document.getElementById('refreshGradesBtn');b.disabled=true;try{await loadSupabaseData();showToast('تم تحديث نتائج الطلاب')}catch(error){showToast('تعذر تحديث النتائج: '+cloudErrorText(error))}finally{b.disabled=false}}else{renderDoctorGradebook();showToast('تم تحديث النتائج المحلية')}});
document.getElementById('closeStudentQuiz').addEventListener('click',closeStudentQuiz);
document.getElementById('studentQuizModal').addEventListener('click',e=>{if(e.target.id==='studentQuizModal')closeStudentQuiz()});
resetQuizQuestionEditor();
document.getElementById('yearNow').textContent=new Date().getFullYear();

// ---------------- Supabase cloud integration ----------------
function cloudErrorText(error){
  const raw=String(error?.message||'حدث خطأ غير متوقع');
  if(/Invalid login credentials/i.test(raw))return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
  if(/Email not confirmed/i.test(raw))return 'أكد بريدك الإلكتروني من الرسالة اللي وصلتك، وبعدها سجل دخولك.';
  if(/row-level security|permission denied/i.test(raw))return 'الصلاحية دي مش مفعلة للحساب. تأكد إن حساب الدكتور معتمد وإن SQL اتنفذ بالكامل.';
  return raw;
}
async function getCloudProfile(authUser){
  const {data,error}=await supabaseClient.from('profiles').select('id,full_name,role,year').eq('id',authUser.id).single();
  if(error)throw error;
  return {id:authUser.id,name:data.full_name||authUser.email?.split('@')[0]||'مستخدم',email:authUser.email,role:data.role,year:data.year};
}
async function loadSupabaseData(){
  if(!supabaseClient||!currentUser)return;
  const [courseRes,pdfRes,quizRes,attemptRes,enrollRes]=await Promise.all([
    supabaseClient.from('courses').select('id,year,title,category,description,lessons,created_by,created_at').order('year').order('title'),
    supabaseClient.from('pdf_resources').select('id,course_id,title,filename,storage_path,size_bytes,uploaded_by,created_at').order('created_at',{ascending:false}),
    supabaseClient.from('quizzes').select('id,course_id,year,title,description,created_by,created_at,quiz_questions(id,prompt,options,sort_order)').order('created_at',{ascending:false}),
    supabaseClient.from('quiz_attempts').select('id,quiz_id,student_name,student_email,year,score,total,percentage,answers,submitted_at').order('submitted_at',{ascending:false}),
    supabaseClient.from('course_enrollments').select('course_id').eq('user_id',currentUser.id)
  ]);
  for(const result of [courseRes,pdfRes,quizRes,attemptRes,enrollRes])if(result.error)throw result.error;
  courses=(courseRes.data||[]).map(c=>({id:c.id,year:Number(c.year),title:c.title,category:c.category,description:c.description,lessons:Array.isArray(c.lessons)?c.lessons:[],createdBy:c.created_by===currentUser.id?currentUser.email:(c.created_by||null),createdById:c.created_by}));
  pdfAttachments=(pdfRes.data||[]).map(f=>({id:f.id,courseId:f.course_id,title:f.title,filename:f.filename,size:Number(f.size_bytes||0),uploadedBy:f.uploaded_by===currentUser.id?currentUser.email:f.uploaded_by,uploadedById:f.uploaded_by,storagePath:f.storage_path,createdAt:f.created_at}));
  teacherQuizzes=(quizRes.data||[]).map(q=>({id:q.id,courseId:q.course_id,year:Number(q.year),title:q.title,description:q.description,createdBy:q.created_by===currentUser.id?currentUser.email:q.created_by,createdById:q.created_by,createdAt:q.created_at,questions:(q.quiz_questions||[]).sort((a,b)=>a.sort_order-b.sort_order).map(item=>({id:item.id,q:item.prompt,opts:item.options,a:null}))}));
  quizAttempts=(attemptRes.data||[]).map(a=>({id:a.id,quizId:a.quiz_id,courseId:teacherQuizzes.find(q=>q.id===a.quiz_id)?.courseId||null,studentName:a.student_name,studentEmail:a.student_email,year:Number(a.year),score:Number(a.score),total:Number(a.total),percentage:Number(a.percentage),answers:a.answers,submittedAt:a.submitted_at}));
  enrolled={...enrolled,[currentUser.email]:(enrollRes.data||[]).map(row=>row.course_id)};
  renderHomeYears();renderCourses();
  if(currentUser.role==='student')renderDashboard();else renderDoctorDashboard();
}
async function activateSupabaseUser(authUser){
  currentUser=await getCloudProfile(authUser);
  await loadSupabaseData();
  updateHeader();
  afterLogin();
}
async function initializeSupabase(){
  if(!supabaseClient){
    const note=document.querySelector('.security-note');
    if(note)note.textContent='وضع تجريبي محلي: لربط الحسابات والملفات والدرجات سحابيًا، أضف رابط Supabase والمفتاح العام في supabase-config.js ثم نفّذ ملف supabase-schema.sql.';
    return;
  }
  const note=document.querySelector('.security-note');
  if(note)note.textContent='الحسابات والملفات والدرجات متصلة بقاعدة البيانات. صلاحيات الدكاترة تعتمدها إدارة الأكاديمية فقط.';
  try{
    const {data,error}=await supabaseClient.auth.getSession();
    if(error)throw error;
    if(data.session?.user)await activateSupabaseUser(data.session.user);
  }catch(error){console.error(error);showToast('تعذر الاتصال بـSupabase: '+cloudErrorText(error))}
  supabaseClient.auth.onAuthStateChange((event)=>{
    if(event==='SIGNED_OUT'){
      currentUser=null;courses=DEFAULT_COURSES;pdfAttachments=[];teacherQuizzes=[];quizAttempts=[];enrolled={};
      updateHeader();renderHomeYears();renderCourses();go('home');
    }
  });
}

async function handleAuth(event){
  if(!supabaseClient)return handleAuthLocal(event);
  event.preventDefault();
  const form=event.currentTarget;const data=new FormData(form);const msg=document.getElementById('authMessage');msg.textContent='';
  const email=String(data.get('email')||'').trim().toLowerCase();const password=String(data.get('password')||'');
  try{
    if(authMode==='register'){
      const name=String(data.get('name')||'').trim();const year=Number(data.get('year')||1);const requestedRole=String(data.get('role')||'student');
      if(name.length<2){msg.textContent='اكتب اسمك بشكل صحيح.';return}
      const {data:result,error}=await supabaseClient.auth.signUp({email,password,options:{data:{full_name:name,year}}});
      if(error)throw error;
      if(!result.session){msg.textContent=requestedRole==='doctor'?'تم إنشاء الحساب مبدئيًا كطالب لحماية صلاحيات الدكاترة. أكد بريدك، وبعدها الإدارة تقدر تعتمدك كدكتور.':'تم إنشاء الحساب. افتح رسالة التأكيد اللي وصلتك على البريد، وبعدها سجل دخولك.';return;}
      await activateSupabaseUser(result.user);
      closeAuth();
      msg.textContent=requestedRole==='doctor'?'الحساب اتعمل كطالب مبدئيًا. لازم إدارة الأكاديمية تعتمد صلاحية الدكتور.':'';
      showToast(requestedRole==='doctor'?'تم إنشاء الحساب، وصلاحية الدكتور تحتاج اعتماد الإدارة.':'تم إنشاء الحساب بنجاح');
      return;
    }
    const {data:result,error}=await supabaseClient.auth.signInWithPassword({email,password});
    if(error)throw error;
    await activateSupabaseUser(result.user);
    const requestedRole=String(data.get('role')||'student');
    if(requestedRole==='doctor'&&currentUser.role!=='doctor')showToast('الحساب لسه مش معتمد كدكتور. تواصل مع إدارة الأكاديمية.');
    closeAuth();showToast('تم تسجيل الدخول بنجاح');
  }catch(error){console.error(error);msg.textContent=cloudErrorText(error)}
}
async function logout(){
  if(!supabaseClient)return logoutLocal();
  const {error}=await supabaseClient.auth.signOut();
  if(error){showToast('تعذر تسجيل الخروج: '+cloudErrorText(error));return;}
  currentUser=null;updateHeader();go('home');showToast('تم تسجيل الخروج');
}
async function handlePdfUpload(event){
  if(!supabaseClient)return handlePdfUploadLocal(event);
  event.preventDefault();const form=event.currentTarget;const data=new FormData(form);const course=courseById(String(data.get('courseId')));const file=data.get('pdfFile');const msg=document.getElementById('pdfUploadMessage');msg.textContent='';
  if(!currentUser||currentUser.role!=='doctor'){msg.textContent='رفع الملفات متاح للدكاترة المعتمدين فقط.';return}
  if(!course||course.createdBy!==currentUser.email){msg.textContent='اختار مقررًا من المقررات اللي أضفتها.';return}
  if(!(file instanceof File)||!file.size||!(file.type==='application/pdf'||file.name.toLowerCase().endsWith('.pdf'))){msg.textContent='اختار ملف PDF صالح.';return}
  if(file.size>20*1024*1024){msg.textContent='حجم الملف أكبر من 20 ميجابايت.';return}
  const uuid=crypto.randomUUID();const safeName=file.name.replace(/[^a-zA-Z0-9._-]/g,'_')||'lecture.pdf';const storagePath=`${currentUser.id}/${course.id}/${uuid}_${safeName}`;
  try{
    const {error:uploadError}=await supabaseClient.storage.from('lecture-pdfs').upload(storagePath,file,{contentType:'application/pdf',upsert:false});
    if(uploadError)throw uploadError;
    const {data:row,error:insertError}=await supabaseClient.from('pdf_resources').insert({course_id:course.id,title:String(data.get('title')).trim()||file.name,filename:file.name,storage_path:storagePath,size_bytes:file.size,uploaded_by:currentUser.id}).select().single();
    if(insertError){await supabaseClient.storage.from('lecture-pdfs').remove([storagePath]);throw insertError;}
    pdfAttachments.unshift({id:row.id,courseId:row.course_id,title:row.title,filename:row.filename,size:Number(row.size_bytes),uploadedBy:currentUser.email,storagePath:row.storage_path,createdAt:row.created_at});
    form.reset();msg.textContent='تم رفع ملف المحاضرة إلى التخزين السحابي.';renderDoctorTools();showToast('تم رفع PDF ومشاركته مع طلاب الفرقة');
  }catch(error){console.error(error);msg.textContent='فشل رفع الملف: '+cloudErrorText(error)}
}
async function openPdfAttachment(id){
  if(!supabaseClient)return openPdfAttachmentLocal(id);
  const meta=pdfAttachments.find(f=>f.id===id);if(!meta){showToast('الملف مش موجود');return}
  if(!currentUser){openAuth('login');return}
  try{
    const {data,error}=await supabaseClient.storage.from('lecture-pdfs').createSignedUrl(meta.storagePath,300);
    if(error)throw error;
    window.open(data.signedUrl,'_blank','noopener,noreferrer');
  }catch(error){console.error(error);showToast('تعذر فتح الملف: '+cloudErrorText(error))}
}
async function removePdfAttachment(id){
  if(!supabaseClient)return removePdfAttachmentLocal(id);
  const file=pdfAttachments.find(f=>f.id===id);if(!file||file.uploadedBy!==currentUser?.email)return;
  if(!confirm('تحذف ملف الـPDF ده؟'))return;
  const {error:storageError}=await supabaseClient.storage.from('lecture-pdfs').remove([file.storagePath]);if(storageError){showToast('تعذر حذف الملف: '+cloudErrorText(storageError));return}
  const {error}=await supabaseClient.from('pdf_resources').delete().eq('id',id);if(error){showToast('تم حذف الملف من التخزين لكن تعذر حذف بياناته: '+cloudErrorText(error));return}
  pdfAttachments=pdfAttachments.filter(f=>f.id!==id);renderDoctorTools();showToast('تم حذف الملف من التخزين السحابي');
}
async function handleCreateQuiz(event){
  if(!supabaseClient)return handleCreateQuizLocal(event);
  event.preventDefault();const form=event.currentTarget;const data=new FormData(form);const course=courseById(String(data.get('courseId')));const message=document.getElementById('quizCreateMessage');message.textContent='';
  const targetYear=Number(data.get('year'));
  if(currentUser?.role!=='doctor'){message.textContent='إنشاء الكويزات متاح للدكاترة المعتمدين فقط.';return}
  if(!YEAR_NAMES[targetYear]){message.textContent='اختار الفرقة المستهدفة.';return}
  if(course&&((course.createdBy!==currentUser.email&&course.createdBy!==null)||Number(course.year)!==targetYear)){message.textContent='اختار مقررًا متاحًا لك من نفس الفرقة.';return}
  const questionNodes=[...document.querySelectorAll('#quizQuestionsEditor .quiz-editor-question')];const questions=[];
  for(let i=0;i<questionNodes.length;i++){const q=String(data.get(`question_${i}`)||'').trim();const opts=[0,1,2,3].map(n=>String(data.get(`option_${i}_${n}`)||'').trim());if(!q||opts.some(x=>!x)){message.textContent=`راجع السؤال رقم ${i+1} واكتب نص السؤال والاختيارات الأربعة.`;return}questions.push({q,opts,a:Number(data.get(`correct_${i}`))})}
  const quizId='quiz-'+crypto.randomUUID();const title=String(data.get('title')).trim();if(!title){message.textContent='اكتب اسم الكويز.';return}
  try{
    const {error:quizError}=await supabaseClient.from('quizzes').insert({id:quizId,course_id:course?.id||null,year:targetYear,title,description:String(data.get('description')||'').trim(),created_by:currentUser.id});if(quizError)throw quizError;
    for(let i=0;i<questions.length;i++){
      const {data:questionRow,error:questionError}=await supabaseClient.from('quiz_questions').insert({quiz_id:quizId,sort_order:i,prompt:questions[i].q,options:questions[i].opts}).select('id').single();
      if(questionError)throw questionError;
      const {error:keyError}=await supabaseClient.from('quiz_answer_keys').insert({question_id:questionRow.id,correct_option:questions[i].a});if(keyError)throw keyError;
      questions[i].id=questionRow.id;
    }
    teacherQuizzes.unshift({id:quizId,courseId:course?.id||null,year:targetYear,title,description:String(data.get('description')||'').trim(),createdBy:currentUser.email,questions,createdAt:new Date().toISOString()});
    form.reset();resetQuizQuestionEditor();message.textContent=`تم نشر الكويز لطلاب ${YEAR_NAMES[targetYear]} على المنصة.`;renderDoctorTools();showToast('تم نشر الكويز لكل طلاب الفرقة المحددة');
  }catch(error){await supabaseClient.from('quizzes').delete().eq('id',quizId);console.error(error);message.textContent='تعذر نشر الكويز: '+cloudErrorText(error)}
}
async function deleteTeacherQuiz(id){
  if(!supabaseClient)return deleteTeacherQuizLocal(id);
  const quiz=teacherQuizzes.find(q=>q.id===id);if(!quiz||quiz.createdBy!==currentUser?.email)return;if(!confirm('حذف الكويز وكل محاولاته المسجلة؟'))return;
  const {error}=await supabaseClient.from('quizzes').delete().eq('id',id);if(error){showToast('تعذر حذف الكويز: '+cloudErrorText(error));return}
  teacherQuizzes=teacherQuizzes.filter(q=>q.id!==id);quizAttempts=quizAttempts.filter(a=>a.quizId!==id);renderDoctorTools();showToast('تم حذف الكويز ومحاولاته');
}
async function submitTeacherQuiz(event,quiz){
  if(!supabaseClient)return submitTeacherQuizLocal(event,quiz);
  event.preventDefault();const data=new FormData(event.currentTarget);const answers=[];
  for(let i=0;i<quiz.questions.length;i++){const selected=data.get(`question_${i}`);if(selected===null){document.getElementById('studentQuizMessage').textContent='جاوب على كل الأسئلة الأول.';return}answers.push({question_id:quiz.questions[i].id,selected_option:Number(selected)})}
  const button=event.currentTarget.querySelector('button[type="submit"]');if(button){button.disabled=true;button.textContent='بيتم تصحيح الاختبار...'}
  try{
    const {data:result,error}=await supabaseClient.rpc('ja_submit_quiz_attempt',{p_quiz_id:quiz.id,p_answers:answers});if(error)throw error;
    const review=result.review||[];const attempt={id:result.attempt_id,quizId:quiz.id,courseId:quiz.courseId,studentName:currentUser.name,studentEmail:currentUser.email,year:Number(currentUser.year),score:Number(result.score),total:Number(result.total),percentage:Number(result.percentage),answers,submittedAt:result.submitted_at};quizAttempts.unshift(attempt);
    const holder=document.getElementById('studentQuizContent');holder.innerHTML=`<div class="quiz-finished"><span class="quiz-finished-icon">✓</span><h3>تم تسليم الكويز بنجاح</h3><strong>${attempt.score} من ${attempt.total}</strong><span class="grade-pill ${attempt.percentage>=50?'pass':'fail'}">${attempt.percentage}%</span><p>${attempt.percentage>=85?'ممتاز! استمر على المستوى ده.':attempt.percentage>=50?'نتيجة كويسة، راجع الأسئلة اللي محتاجة مراجعة.':'راجع الدروس وحاول مرة تانية.'}</p><div class="answer-review">${review.map((r,i)=>`<p><b>${i+1}. ${escapeHTML(r.prompt)}</b><small class="${r.selected_option===r.correct_option?'correct-answer':'wrong-answer'}">${r.selected_option===r.correct_option?'إجابة صحيحة':'الإجابة الصحيحة: '+escapeHTML(r.options[r.correct_option])}</small></p>`).join('')}</div><button class="btn btn-primary btn-block" type="button" id="finishStudentQuiz">إغلاق</button></div>`;
    document.getElementById('finishStudentQuiz').addEventListener('click',closeStudentQuiz);renderStudentLearningTools((enrolled[currentUser.email]||[]).map(courseById).filter(Boolean));showToast('اتسجلت درجتك في قاعدة البيانات عند الدكتور');
  }catch(error){console.error(error);const msg=document.getElementById('studentQuizMessage');if(msg)msg.textContent='تعذر تسليم الاختبار: '+cloudErrorText(error);if(button){button.disabled=false;button.textContent='تسليم الاختبار ومعرفة الدرجة'}}
}

// Initial render
renderHomeYears();renderCourses();renderPractice();updateHeader();
if(currentUser){if(currentUser.role==='student')renderDashboard();else renderDoctorDashboard()}
if(supabaseClient){currentUser=null;updateHeader();initializeSupabase()}else{initializeSupabase()}
