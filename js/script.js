document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('farajaBookingForm');
    const modal = document.getElementById("bookingModal");
    const body = document.body;
    const closeBtn = document.getElementById("btnCloseModal");

    // 1. TAFUTA VITUFE VYOTE (Header na Body)
    const bookingButtons = document.querySelectorAll('.open-booking-modal, .btnOpenModalLink');

    function openBooking() {
        modal.style.display = "flex";
        body.style.overflow = "hidden"; // Inazuia kuscroll kule nyuma
    }

    function closeBooking() {
        modal.style.display = "none";
        body.style.overflow = "auto"; // Inaruhusu kuscroll tena
    }

    bookingButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openBooking();
        });
    });

    if (closeBtn) closeBtn.onclick = closeBooking;
    window.onclick = (e) => { if (e.target == modal) closeBooking(); };

    // 2. SUBMIT FORM LOGIC
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Kuchukua data
            const jina = document.getElementById("fname").value;
            const simu = document.getElementById("fphone").value;
            const madrasa = document.getElementById("fmadrasa").value;
            const eneo = document.getElementById("flocation").value;
            const tarehe = document.getElementById("fdate").value;
            const shughuli = document.getElementById("ftype").value;
            const muda = document.getElementById("ftime").value;
            const siku_za_kazi = document.getElementById("fdays").value;
            
            // Kuchukua Package na Bei
            const packageSelect = document.getElementById("fpackage");
            const packageData = packageSelect.value.split('|');
            const packageName = packageData[0];
            const packagePrice = parseInt(packageData[1]);

            // Kupiga hesabu ya 70%
            const deposit = packagePrice * 0.7;
            const formatMoney = (val) => new Intl.NumberFormat().format(val);

            // Kutengeneza ujumbe wa WhatsApp
            let rawMessage = `*BOOKING FARAJA YANGU TV*\n` +
                             `----------------------------\n` +
                             `*Jina:* ${jina}\n` +
                             `*Simu:* ${simu}\n` +
                             `*Shughuli:* ${shughuli}\n` +
                             `*Madrasa:* ${madrasa}\n` +
                             `*Eneo:* ${eneo}\n` +
                             `*Package:* ${packageName}\n`;

            if(packagePrice > 0) {
                rawMessage += `*Gharama:* TSh ${formatMoney(packagePrice)}/=\n` +
                              `*MALIPO YA 70%:* TSh ${formatMoney(deposit)}/=\n`;
            }

            rawMessage += `*Tarehe:* ${tarehe} (${muda})\n` +
                          `*Siku za Kazi:* ${siku_za_kazi} siku\n` +
                          `----------------------------\n` +
                          `Niko tayari kulipia 70% sasa hivi.`;

            const encodedMessage = encodeURIComponent(rawMessage);
            const whatsappUrl = `https://wa.me/255699529291?text=${encodedMessage}`;

            // 1. Fungua WhatsApp kwenye Tab mpya
            window.open(whatsappUrl, '_blank');
            
            // 2. Peleka ukurasa mkuu kwenye malipo.html ukiwa na kiasi cha pesa
            setTimeout(() => {
                window.location.href = `malipo.html?amount=${deposit}`;
            }, 1000);

            closeBooking();
            bookingForm.reset();
        });
    }
});

