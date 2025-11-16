(function () {
  const STORAGE_KEY = 'kc-color-scheme-toggle';
  const toggleSelector = 'input[name="color-scheme"]';

  const readPreference = () => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Theme preference could not be read from localStorage.', error);
      return null;
    }
  };

  const writePreference = (isChecked) => {
    try {
      localStorage.setItem(STORAGE_KEY, isChecked ? 'checked' : 'unchecked');
    } catch (error) {
      console.warn('Theme preference could not be saved to localStorage.', error);
    }
  };

  const syncToggleState = (toggles, targetState) => {
    toggles.forEach((toggle) => {
      if (toggle.checked !== targetState) {
        toggle.checked = targetState;
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll(toggleSelector);
    if (!toggles.length) return;

    const storedPreference = readPreference();
    if (storedPreference) {
      syncToggleState(toggles, storedPreference === 'checked');
    }

    toggles.forEach((toggle) => {
      toggle.addEventListener('change', (event) => {
        const isChecked = event.currentTarget.checked;
        writePreference(isChecked);
        syncToggleState(toggles, isChecked);
      });
    });
  });

  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    const toggles = document.querySelectorAll(toggleSelector);
    if (!toggles.length) return;
    syncToggleState(toggles, event.newValue === 'checked');
  });
})();
