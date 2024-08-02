document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Misalnya, kita tambahkan offset 50px jika diperlukan
        const offset = -100;

        window.scrollTo({
          top:
            targetElement.offsetTop -
            document.querySelector("nav").offsetHeight -
            offset,
          behavior: "smooth",
        });
      }
    });
  }
});

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const route = document.getElementById("route").value;
  const jamkat = document.getElementById("jamkat").value;
  const date = document.getElementById("date").value;

  // Simple validation
  if (!name || !phone || !route || !jamkat || !date) {
    alert("Mohon isi semua field");
    return;
  }

  try {
    const message = `Halo, saya ingin memesan travel dengan detail berikut:\n\nNama: ${name}\nNomor Telepon: ${phone}\nRute: ${route}\nTanggal Keberangkatan: ${date}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/6281316111798?text=${encodedMessage}`;

    window.open(whatsappLink, "_blank");

    // Give user feedback
    alert(
      "Terima kasih! Anda akan diarahkan ke WhatsApp untuk menyelesaikan pemesanan."
    );

    // Optional: Reset form
    this.reset();
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    alert("Maaf, terjadi kesalahan. Silakan coba lagi nanti.");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navbarToggle = document.getElementById("navbar-toggle");
  const navbarDefault = document.getElementById("navbar-default");
  const menuItems = navbarDefault.querySelectorAll("a");

  // Function to close the menu
  function closeMenu() {
    navbarDefault.classList.add("hidden");
    navbarToggle.setAttribute("aria-expanded", "false");
  }

  // Toggle menu when the button is clicked
  navbarToggle.addEventListener("click", function () {
    navbarDefault.classList.toggle("hidden");
    const isExpanded = navbarToggle.getAttribute("aria-expanded") === "true";
    navbarToggle.setAttribute("aria-expanded", !isExpanded);
  });

  // Close menu when a menu item is clicked
  menuItems.forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside of it
  document.addEventListener("click", function (event) {
    const isClickInsideNavbar =
      navbarDefault.contains(event.target) ||
      navbarToggle.contains(event.target);
    if (!isClickInsideNavbar && !navbarDefault.classList.contains("hidden")) {
      closeMenu();
    }
  });

  // Close menu when window is resized to desktop view
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      // 768px is the breakpoint for md in Tailwind
      closeMenu();
    }
  });
});
