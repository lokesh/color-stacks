<template>
  <div class="backdrop" @click="closeModal">
    <slot />
  </div>
</template>

<script>
export default {
  name: "ModalBackdrop",
  props: {
    focusElement: {
      default: null,
      type: Object
    }
  },
  mounted() {
    const close = e => {
      const ESC = 27;
      if (e.keyCode !== ESC) return;
      this.closeModal();
    };
    // Close the modal when the
    // user presses the ESC key.
    document.addEventListener("keyup", close);
    this.$on("hook:destroyed", () => {
      document.removeEventListener("keyup", close);
    });

    // Activate the modal when the component is mounted.
    this.activate();
    this.$on("hook:destroyed", () => {
      // Deactivate when the component is destroyed.
      this.deactivate();
    });
  },
  methods: {
    activate() {
      // Save the current active element
      // so we can restore it when closing
      // the popup overlay.
      this.previousActiveElement = document.activeElement;

      // Prevent the background to be scrollable.
      this.disableScrolling();
      // Make it impossible to focus elements in
      // the background when using the TAB key.
      this.inert();
      // Focus the first focusable element in the dialog.
      this.focusFirstDescendant();
    },
    closeModal() {
      this.$store.commit("closeModal");
    },
    async deactivate() {
      this.enableScrolling();
      await this.inert(false);
      this.restoreFocus();
    },
    // Disable scrolling on all devices (including iOS).
    disableScrolling() {
      this.scrollPosition = window.pageYOffset;

      const $body = document.querySelector("body");
      $body.style.overflow = "hidden";
      $body.style.position = "fixed";
      $body.style.top = `-${this.scrollPosition}px`;
      $body.style.width = "100%";
    },
    enableScrolling() {
      const $body = document.querySelector("body");
      $body.style.removeProperty("overflow");
      $body.style.removeProperty("position");
      $body.style.removeProperty("top");
      $body.style.removeProperty("width");

      window.scrollTo(0, this.scrollPosition);
    },
    // Make all elements except the overlay inert.
    async inert(status = true) {
      await this.$nextTick();
      [...this.$root.$el.children].forEach(child => {
        if (child === this.$el || child.contains(this.$el)) return;
        child.inert = status;
      });
    },
    focusFirstDescendant() {
      const focusable = this.$el.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable[0] && focusable[0].focus) focusable[0].focus();
    },
    restoreFocus() {
      const element = this.focusElement || this.previousActiveElement;

      if (element && element.focus) element.focus();
    }
  }
};
</script>

<style>
.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal {
  padding: var(--content-padding);
  width: 100%;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: var(--radius);
}
</style>
