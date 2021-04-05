import { createSelector } from "reselect";
const path = "appData";

const citiesData = (state) => state[path].cities;
const districtData = (state) => state[path].district;
const categoriesData = (state) => state[path].categories;
const serviceProvidesData = (state) => state[path].serviceProvides;
const serviceTypeData = (state) => state[path].serviceType;

export const getKOLSType = (state) => state[path].kolsTypes;

export const getCity = createSelector(citiesData, (cities) => cities);

export const getDistrict = createSelector(districtData, (district) => district);

export const getCategories = createSelector(categoriesData, (categories) => categories);

export const getLocale = (state) => state[path].locale;

export const getServiceProvides = createSelector(serviceProvidesData, (serviceProvides) => serviceProvides);
export const getServiceType = createSelector(serviceTypeData, (serviceType) => serviceType);
