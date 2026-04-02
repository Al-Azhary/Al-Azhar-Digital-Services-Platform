/**
 * دالة لتعيين الصور لمرة واحدة عند التحميل
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

window.addEventListener('DOMContentLoaded', initializeAppImages);

// تبديل الوضع الليلي
const darkBtn = document.getElementById("darkModeBtn");
if(darkBtn) {
    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        darkBtn.innerHTML = isDark ? 'وضع نهاري' : 'وضع ليلي';
    });
}

// وظيفة النسخ
function copyText(type) {
    const textToCopy = type === "email" ? "abdelwhabhany62@gmail.com" : "+966502069445";
    navigator.clipboard.writeText(textToCopy).then(() => {
        const msg = document.getElementById(type + "Message");
        if (msg) {
            msg.textContent = "تم النسخ بنجاح";
            setTimeout(() => msg.textContent = "", 2000);
        }
    });
}

// إدارة واجهة الدفع
function togglePaymentInfo() {
    const method = document.getElementById("paymentMethod").value;
    const infoBox = document.getElementById("paymentInfoBox");
    if(infoBox) infoBox.style.display = method ? "block" : "none";
    
    const cashBox = document.getElementById("cashBox");
    const transferBox = document.getElementById("transferBox");
    const cardBox = document.getElementById("cardBox");
    
    if(cashBox) cashBox.style.display = method === "كاش" ? "block" : "none";
    if(transferBox) transferBox.style.display = method === "تحويل" ? "block" : "none";
    if(cardBox) cardBox.style.display = method === "بطاقة" ? "block" : "none";

    if(document.getElementById("cashAgree")) document.getElementById("cashAgree").required = (method === "كاش");
    if(document.getElementById("transferAgree")) document.getElementById("transferAgree").required = (method === "تحويل");
}

// معالجة الإرسال للواتساب بتنسيق رسمي لمنصة الأزهري
const orderForm = document.getElementById("orderForm");
if (orderForm) {
    orderForm.onsubmit = (e) => {
        e.preventDefault();
        
        const name = document.getElementById("orderName").value;
        const service = document.getElementById("orderService").value;
        const details = document.getElementById("orderDetails").value;
        const payment = document.getElementById("paymentMethod").value;
        const discount = document.getElementById("discountCode").value.trim() || "لا يوجد";

        // تحديد نوع الطلب
        const isEdit = service.includes("تعديل");
        const requestHeader = isEdit ? "نموذج طلب تعديل" : "نموذج طلب خدمة جديدة";

        // تجهيز معلومات الدفع والإقرارات
        let paymentDetail = `طريقة الدفع: ${payment}`;
        let legalAgreements = "- الاقرار بالدفع كاملا قبل استلام الطلب.%0A";

        if (payment === "كاش") {
            paymentDetail += `%0A- موقع استلام المبلغ: https://maps.app.goo.gl/NNq3dBu3brMEhbs6A`;
            legalAgreements += "- الاقرار بالالتزام بالدفع في الموقع المحدد.";
        } else if (payment === "تحويل") {
            paymentDetail += "%0A- سيتم ارفاق صورة ايصال التحويل الان.";
            legalAgreements += "- التعهد بارسال ايصال التحويل فورا.";
        } else if (payment === "بطاقة") {
            paymentDetail += "%0A- رقم البطاقة المعتمد: 5294156406084172";
        }

        // صياغة الرسالة النهائية باسم المنصة
        const finalMsg = 
            `*منصة الأزهري للخدمات الرقمية*%0A` +
            `----------------------------------%0A` +
            `*${requestHeader}*%0A` +
            `----------------------------------%0A` +
            `الاسم الكامل: ${name}%0A` +
            `الخدمة المطلوبة: ${service}%0A` +
            `تفاصيل الطلب: ${details}%0A` +
            `كود الخصم: ${discount}%0A` +
            `----------------------------------%0A` +
            `*بيانات الدفع:*%0A` +
            `${paymentDetail}%0A` +
            `----------------------------------%0A` +
            `*الاقرارات الرسمية:*%0A` +
            `${legalAgreements}%0A%0A` +
            `تم الارسال من الموقع الرسمي للمنصة%0A` +
            `ساعات العمل: 10:00 صباحا - 10:00 مساء`;

        // فتح الواتساب
        window.open(`https://wa.me/966502069445?text=${finalMsg}`, "_blank");
    };
}

// زر الصعود
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => { 
    if (scrollTopBtn) scrollTopBtn.style.display = window.scrollY > 400 ? "block" : "none"; 
};
if (scrollTopBtn) scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
