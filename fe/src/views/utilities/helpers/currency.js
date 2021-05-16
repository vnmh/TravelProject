import numeral from "numeral";

const currencyFormat = (number, unit = " VNĐ") => {
   if (typeof number === "number") {
      var myNumeral = numeral(number);
      numeral.defaultFormat("0,0");
      return myNumeral.format() + unit;
   }
   return "";
};

const numberFormatWithPoint = (number) => {
   if (typeof number === "number") {
      var myNumeral = numeral(number);
      numeral.defaultFormat("0,0");
      return myNumeral.format();
   }
   return "";
};

export { currencyFormat, numberFormatWithPoint };
