import Validator from 'validator';
import isEmpty from 'is-empty';

const validateCreateRegantChartInput = (data) => {
    let errors = {};
  
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.serialNo = !isEmpty(data.serialNo) ? data.serialNo : "";
    data.range = !isEmpty(data.range) ? data.range : "";
    //data.month = !isEmpty(data.month) ? data.month : "";
    //data.year = data.year == null ? data.year : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Chart Name is required";
    }
    if (Validator.isEmpty(data.serialNo)) {
        errors.serialNo = "Chart Serial Number is required";
    }
    if (Validator.isEmpty(data.range)) {
        errors.range = "Chart Range is required";
    }
    if (data.month == null) {
        errors.month = "Chart Month is required";
    }
    if (data.year == null) {
        errors.year = "Chart Year is required";
    } 

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
const validateCreateMonthChartInput = (data) => {
    let errors = {};
      
        // Convert empty fields to an empty string so we can use validator functions
        data.name = !isEmpty(data.name) ? data.name : "";
        data.month = !isEmpty(data.month) ? data.month : "";
        data.year = !isEmpty(data.year) ? data.year : "";
    
        if (Validator.isEmpty(data.name)) {
            errors.name = "Chart Name is required";
        }       
        if (Validator.isEmpty(data.month)) {
            errors.month = "Chart Month is required";
        }
        if (Validator.isEmpty(data.year)) {
            errors.year = "Chart Year is required";
        } 
    
        return {
            errors,
            isValid: isEmpty(errors)
        };
};
export { validateCreateRegantChartInput, validateCreateMonthChartInput };