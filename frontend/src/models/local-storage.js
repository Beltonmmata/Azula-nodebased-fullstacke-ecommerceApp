const localStorageObj = {
  // @param {string} key
  getItem(key) {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  },

  /**
   * @param {string} key - The key of the item to store.
   * @param {any} value - The value to store (it will be stringified).
   */
  setItem(key, value) {
    if (value === undefined || value === null) {
      throw new Error("Cannot store undefined or null value");
    }
    localStorage.setItem(key, JSON.stringify(value)); // Store the value as a JSON string
  },

  /**
   * Remove an item from local storage.
   * @param {string} key - The key of the item to remove.
   */
  removeItem(key) {
    localStorage.removeItem(key);
  },

  

  /**
   * Update an existing item in local storage by modifying it.
   * @param {string} key - The key of the item to update.
   * @param {Function} updateCallback - A callback function that receives the current data and returns the new data.
   */
  updateItem(key, updateCallback) {
    const currentItem = this.getItem(key);
    if (currentItem !== null) {
      const updatedItem = updateCallback(currentItem);
      this.setItem(key, updatedItem);
    } else {
      console.error(`Item with key "${key}" does not exist`);
    }
  },

  /**
   * Increment a numeric value in local storage.
   * @param {string} key - The key of the item to increment.
   * @param {number} incrementBy - The amount to increment the stored value by.
   * @returns {number} The updated value.
   */
  incrementItem(key, incrementBy = 1) {
    const currentValue = this.getItem(key) || 0;
    const updatedValue = currentValue + incrementBy;
    this.setItem(key, updatedValue);
    return updatedValue;
  },

  /**
   * Decrement a numeric value in local storage.
   * @param {string} key - The key of the item to decrement.
   * @param {number} decrementBy - The amount to decrement the stored value by.
   * @returns {number} The updated value.
   */
  decrementItem(key, decrementBy = 1) {
    const currentValue = this.getItem(key) || 0;
    const updatedValue = currentValue - decrementBy;
    this.setItem(key, updatedValue);
    return updatedValue;
  },
};

export default localStorageObj;
