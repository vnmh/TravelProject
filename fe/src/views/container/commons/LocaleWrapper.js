import { useEffect } from "react";
import { appDataSelector } from "../../../state/ducks/appData";
import { connect } from "react-redux";

const LocaleWrapper = (props) => {
   const { locale } = props;
   return props.children;
};

const mapStateToProps = (state) => ({
   locale: appDataSelector.getLocale(state)
});

export default connect(mapStateToProps)(LocaleWrapper);
