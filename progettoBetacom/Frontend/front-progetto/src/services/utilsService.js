/* eslint-disable */

import { getMonth } from "date-fns";

export default {
  datePadString: function(date){
    date = new Date(date);
    return date.getFullYear() + '-' + (""+(date.getMonth()+1)).padStart(2, "0") + '-' +  (""+date.getDate()).padStart(2, "0");
  },

  dateMaxPadString: function(date){
    date = new Date(date);
    return (
        ("" + date.getDate()).padStart(2, "0") + "/" +
        ("" + (date.getMonth() + 1)).padStart(2, "0") + "/" +
        date.getFullYear()
    );
}


  // datePadString: function(date){
  //   date = new Date(date);
  //   return date.getFullYear() + "-" + ("" + (date.getMonth() + 1)).padStart(2, "0") + "-" + ("" + date.getDate()).padStart(2, "0");
  // }
};
