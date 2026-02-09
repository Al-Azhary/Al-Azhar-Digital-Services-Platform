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
const orderForm = document.getElementById("orderForm");
if (orderForm) {
    orderForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("orderName").value;
        const service = document.getElementById("orderService").value;
        const details = document.getElementById("orderDetails").value;
        
        // جلب قيمة كود الخصم، وإذا كان فارغاً نكتب "لا يوجد"
        const discount = document.getElementById("discountCode").value.trim() || "لا يوجد";
        
        // رسالة منظمة في أسطر منفصلة
        // %0A تعني سطر جديد في رابط الواتساب
        const finalMsg = `طلب خدمة جديد من المنصة:%0A` +
                         `الاسم: ${name}%0A` +
                         `البريد الاكتروني: ${document.getElementById("orderEmail").value}%0A` +
                         `الخدمة: ${service}%0A` +
                         `التفاصيل: ${details}%0A` +
                         `كود الخصم: ${discount}%0A` +
                         `الدفع: كاش%0A` +
                         `السعر: يحدد بعد الطلب`;

        // رقم الواتساب: 966575477323
        window.open(`https://wa.me/966502069445?text=${finalMsg}`, "_blank");
    };
}

// زر الصعود
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => { 
    if (scrollTopBtn) scrollTopBtn.style.display = window.scrollY > 400 ? "block" : "none"; 
};
if (scrollTopBtn) scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
