// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          //login page
          "welcome_back": "Welcome Back!",
          "log_in_to_access_services": "Log in to access your services.",
          "user": "User",
          "admin": "Admin",
          "email": "Email",
          "password": "Password",
          "forgot_password": "Forgot password?",
          "log_in": "Log In",
          "new_user": "New User",
          "register": "Register",
          "explore_ai_services": "Explore AI Services Faster, Smoother and Easier",
          "scalable_solutions": "Scalable solutions at the lowest cost possible. Secure your digital assets today.",

          //Signup page
          "signup_account": "Sign Up Account",
          "first_name": "First Name",
          "last_name": "Last Name",
          "confirm_password": "Confirm Password",
          "create_password": "Create Password",
          "signup": " Sign up",
          "already_have_account": "Already have an account?",
           "get_started": "Get Started",
          "with_us": "with Us",
          "steps_to_register": "Complete these easy steps to register your account" ,
           "step_2": "Set up workspace" ,
           "step_3": "Set up Profile" ,

           //NavBar
           "home": "Home",
           "about": "About",

        }
      },
      ar: {
        translation: {
           "welcome_back": "مرحباً بك!",
          "log_in_to_access_services": "سجل الدخول للوصول إلى خدماتك.",
           "user": "مستخدم",
          "admin": "مسؤل",
          "email": "بريد إلكتروني",
          "password": "كلمة المرور",
          "forgot_password": "هل نسيت كلمة السر؟",
          "log_in": "تسجيل الدخول",
          "new_user": "مستخدم جديد",
          "register": "تسجيل",
          "explore_ai_services": "استكشف خدمات الذكاء الاصطناعي أسرع، أكثر سلاسة وأسهل",
          "scalable_solutions": "حلول قابلة للتطوير بأقل تكلفة ممكنة. احمِ أصولك الرقمية اليوم.",
          
          //Signup page
          "signup_account": "تسجيل الحساب",
          "first_name": "الاسم الأول",
          "last_name": "الاسم الأخير",
          "confirm_password": "تأكيد كلمة المرور",
          "create_password": "إنشاء كلمة المرور",
          "signup": " تسجيل",
          "already_have_account": "هل لديك حساب بالفعل?" ,
           "get_started": "ابدأ",
          "with_us": "معنا",
          "steps_to_register": "أكمل هذه الخطوات البسيطة لتسجيل حسابك" ,
           "step_2": "قم بإعداد مساحة العمل" ,
           "step_3": "قم بإعداد الملف الشخصي"
        }
      },
      he: {
        translation: {
           "welcome_back": "ברוך הבא בחזרה!",
          "log_in_to_access_services": "התחבר כדי לגשת לשירותים שלך.",
           "user": "משתמש",
          "admin": "מנהל",
          "email": "אימייל",
          "password": "סִיסמָה",
          "forgot_password": "שכחת סיסמה?",
          "log_in": "התחבר",
          "new_user": "משתמש חדש",
          "register": "לִרְשׁוֹם",
          "explore_ai_services": "גלו שירותי בינה מלאכותית מהירים, חלקים וקלים יותר",
          "scalable_solutions": "פתרונות ניתנים להרחבה בעלות הנמוכה ביותר האפשרית. אבטחו את הנכסים הדיגיטליים שלכם עוד היום.",
          
          //Signup page
          "signup_account": "הרשמה לחשבון",
          "first_name": "שם ראשון",
          "last_name": "שֵׁם מִשׁפָּחָה",
          "confirm_password": "אשר את הסיסמה",
          "create_password": "צור סיסמה",
          "signup": " הירשם",
          "already_have_account": "כבר יש לך חשבון?",
          "get_started": "התחל",
          "with_us": "אִיתָנוּ",
          "steps_to_register": "השלם את השלבים הקלים הבאים כדי לרשום את חשבונך" ,
          "step_2": "הגדר סביבת עבודה" ,
          "step_3": "הגדר פרופיל" 
        }
      }
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;