import * as yup from 'yup';

export const userDetailsSchema = yup.object({
  email: yup.string().nullable().email('Must be a valid email').required("Can't be empty"),
  firstName: yup
    .string()
    .required('Please check again')
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Must be at most 20 characters'),
  lastName: yup
    .string()
    .required('Please check again')
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Must be at most 20 characters'),
  profilePicture: yup
    .mixed()
    .nullable()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return value.size <= 2 * 1024 * 1024; // 2MB limit
      }
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true;
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (value instanceof File) {
        return allowedTypes.includes(value.type);
      }
      return false;
    })
});
