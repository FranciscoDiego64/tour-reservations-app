import React from 'react';

const Reservation = () => {
  return (
    <form>
      <label>
        Date:
        <input type="date" name="date" />
      </label>
      <input type="submit" value="Reserve" />
    </form>
  );
};

export default Reservation;
