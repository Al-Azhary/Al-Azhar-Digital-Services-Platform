/**
 * دالة لتعيين الصور لمرة واحدة عند التحميل
 * صور تقنية احترافية بدون وجود أشخاص
 */
function initializeAppImages() {
    const staticImages = {
        imgAbout: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
        imgSkills: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
        imgProjects: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
        imgServices: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
        imgOrder: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000",
        imgContact: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000"
    };

    for (const id in staticImages) {
        const imgElement = document.getElementById(id);
        if (imgElement) {
            imgElement.src = staticImages[id];
        }
    }
}

// تنفيذ الدالة فور تحميل الموقع
window.addEventListener('DOMContentLoaded', initializeAppImages);

// تبديل الوضع الليلي
const darkBtn = document.getElementById("darkModeBtn");
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    darkBtn.innerHTML = isDark ? '<i class="bi bi-sun"></i> وضع نهاري' : '<i class="bi bi-moon"></i> وضع ليلي';
});

// وظيفة النسخ
function copyText(type) {
    const textToCopy = type === "email" ? "abdelwhabhany62@gmail.com" : "+966575477323";
    navigator.clipboard.writeText(textToCopy).then(() => {
        const msg = document.getElementById(type + "Message");
        if (msg) {
            msg.textContent = "✓ تم النسخ";
            setTimeout(() => msg.textContent = "", 2000);
        }
    });
}

// إرسال واتساب (تحديث لإضافة كود الخصم)
// 1. تبديل واجهة الدفع وإدارة إلزامية المربعات
function togglePaymentInfo() {
    const method = document.getElementById("paymentMethod").value;
    document.getElementById("paymentInfoBox").style.display = method ? "block" : "none";
    
    // إظهار الصناديق
    const cashBox = document.getElementById("cashBox");
    const transferBox = document.getElementById("transferBox");
    const cardBox = document.getElementById("cardBox");
    
    cashBox.style.display = method === "كاش" ? "block" : "none";
    transferBox.style.display = method === "تحويل" ? "block" : "none";
    cardBox.style.display = method === "بطاقة" ? "block" : "none";

    // جعل المربعات مطلوبة فقط عند اختيار نوع الدفع الخاص بها
    document.getElementById("cashAgree").required = (method === "كاش");
    document.getElementById("transferAgree").required = (method === "تحويل");
}

// 2. معالجة الإرسال للواتساب
const orderForm = document.getElementById("orderForm");
if (orderForm) {
    orderForm.onsubmit = (e) => {
        e.preventDefault();
        
        const name = document.getElementById("orderName").value;
        const service = document.getElementById("orderService").value;
        const details = document.getElementById("orderDetails").value;
        const payment = document.getElementById("paymentMethod").value;
        const discount = document.getElementById("discountCode").value.trim() || "لا يوجد";

        // تجهيز نصوص الإقرارات للرسالة
        let agreementsText = `✅ أقر بالدفع كاملاً قبل الاستلام.%0A`;
        let payMsg = `طريقة الدفع: ${payment}`;

        if (payment === "كاش") {
            payMsg += `%0Aموقع استلام الكاش: https://maps.app.goo.gl/NNq3dBu3brMEhbs6A`;
            agreementsText += `✅ أقر بالدفع في الموقع المحدد.`;
        } else if (payment === "تحويل") {
            payMsg += `%0A(سأقوم بإرفاق صورة التحويل الآن)`;
            agreementsText += `✅ أتعهد بإرسال إيصال التحويل.`;
        } else if (payment === "بطاقة") {
            payMsg += `%0Aرقم البطاقة المستخدم: 5294156406084172`;
        }

        const finalMsg = `*طلب خدمة جديد من المنصة*%0A` +
                         `----------------------------%0A` +
                         `الاسم: ${name}%0A` +
                         `الخدمة: ${service}%0A` +
                         `التفاصيل: ${details}%0A` +
                         `كود الخصم: ${discount}%0A` +
                         `${payMsg}%0A` +
                         `----------------------------%0A` +
                         `*الإقرارات:*%0A${agreementsText}%0A` +
                         `*وقت العمل:* 10:00 ص - 10:00 م`;

        window.open(`https://wa.me/966502069445?text=${finalMsg}`, "_blank");
    };
}

// زر الصعود
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => { 
    if (scrollTopBtn) scrollTopBtn.style.display = window.scrollY > 400 ? "block" : "none"; 
};
if (scrollTopBtn) scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
