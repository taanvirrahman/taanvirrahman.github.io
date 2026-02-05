import { submitToSheet } from "./model.js";

export const initNewsletter = () => {
    // 1. Inject Style
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "src/styles/ui/newsletter.css";
    document.head.appendChild(styleLink);

    // 2. Inject HTML
    const modalHTML = `
    <div class="newsletter-modal-overlay" id="newsletter-modal">
        <div class="newsletter-modal">
            <button class="newsletter-close" id="newsletter-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="newsletter-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <h3 class="newsletter-title">Join the Inner Circle.</h3>
            <p class="newsletter-desc">Get early access to my latest essays on software architecture, design patterns, and minimalist philosophy. No spam, ever.</p>
            <form class="newsletter-form" id="newsletter-form">
                <input type="email" class="newsletter-input" placeholder="your@email.com" required>
                <button type="submit" class="newsletter-submit">Subscribe</button>
            </form>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // 3. Logic
    const modal = document.getElementById("newsletter-modal");
    const closeBtn = document.getElementById("newsletter-close");
    const form = document.getElementById("newsletter-form");
    const triggers = document.querySelectorAll(".newsletter-trigger"); // Generic class for any button

    const openModal = (e) => {
        if (e) e.preventDefault();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        // Focus input
        setTimeout(() => {
            modal.querySelector("input").focus();
        }, 100);
    };

    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    };

    // Attach to all triggers
    triggers.forEach(btn => btn.addEventListener("click", openModal));

    // Close events
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
    });

    // Form Submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const input = form.querySelector("input");
        const btn = form.querySelector("button");
        const email = input.value;

        if (!email) return;

        const originalText = btn.innerText;
        btn.innerText = "Joining...";
        btn.disabled = true;

        const success = await submitToSheet({
            type: "Newsletter",
            email: email
        });

        if (success) {
            btn.innerText = "Welcome!";
            btn.style.backgroundColor = "var(--accent-emerald)";
            setTimeout(() => {
                closeModal();
                btn.innerText = originalText;
                btn.disabled = false;
                input.value = "";
            }, 1500);
        } else {
            btn.innerText = "Failed. Try again.";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            }, 2000);
        }
    });

    // Expose global for manual triggering if needed
    globalThis.openNewsletter = openModal;
};
