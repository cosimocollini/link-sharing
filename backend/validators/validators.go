package validators

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

func BaseValidator(str interface{}) (string, error) {
	validate := validator.New()

	err := validate.Struct(str)
	if err != nil {
		errors := err.(validator.ValidationErrors)
		return fmt.Sprintf("Validation error: %s", errors), err
	}
	return "", nil
}
