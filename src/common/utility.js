export default {
  // Determines if a given elementLength will fit inside of a containerLength.
  // If it overflows out of containerLength then shift it such that it does not overflow.
  shiftOffset(offset, elementLength, containerLength, adjust = 0) {
    let adjustedOffset = offset;
    const overflow = offset + elementLength - containerLength + adjust;

    // Shift the element based such that it stays within the container
    if (offset < 0) {
      adjustedOffset -= offset;
    } else if (overflow > 0) {
      adjustedOffset -= overflow;
    }

    return adjustedOffset;
  },

  // Determines if a given elementLength at a given offset will fit inside a containerLength.
  // If it overflows out of containerLength then flip it over a given targetLength.
  // targetLength and adjust are both optional.
  flipInvertOffset(offset, elementLength, containerLength, targetLength = 0, adjust = 0) {
    let adjustedOffset = offset;
    const overflow = offset + elementLength - containerLength;
    const flipInvertAmount = elementLength + targetLength + adjust;

    if (offset < 0) {
      // Move element from above target to below target.
      adjustedOffset += flipInvertAmount;
    } else if (overflow > 0) {
      // Move element from below target to above target.
      adjustedOffset -= flipInvertAmount;
    }

    return adjustedOffset;
  }
};