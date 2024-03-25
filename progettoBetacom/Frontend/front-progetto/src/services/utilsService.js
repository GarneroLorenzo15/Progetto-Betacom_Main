/* eslint-disable */

import { getMonth } from "date-fns";

export default {
  dateToString: function(date){
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' +  date.getDate();
  },

  datePadString: function(date){
    date = new Date(date);
    return date.getFullYear() + "-" + ("" + (date.getMonth() + 1)).padStart(2, "0") + "-" + ("" + date.getDate()).padStart(2, "0");
  }
};
