import type {
  FieldArrayPath,
  FieldPath,
  FieldValues,
  FormStore,
  Maybe,
  ResponseData,
} from '../types';
import { getFieldStore } from '../utils';

type FieldOptions = Partial<{
  shouldActive: boolean;
  shouldTouched: boolean;
  shouldDirty: boolean;
  shouldValid: boolean;
}>;

/**
 * Checks if the specified field is included in the form.
 *
 * @param form The form of the field.
 * @param name The name of the field.
 *
 * @returns Whether the field is included.
 */
export function hasField<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>,
  TFieldArrayName extends FieldArrayPath<TFieldValues>
>(
  form: FormStore<TFieldValues, TResponseData, TFieldName, TFieldArrayName>,
  name: TFieldName | string,
  options: Maybe<FieldOptions> = {}
): boolean {
  // Destructure options and set default values
  const {
    shouldActive = true,
    shouldTouched = false,
    shouldDirty = false,
    shouldValid = false,
  } = options;

  // Get store of specified field
  const field = getFieldStore(form, name as TFieldName);

  // If field is not present, set listener to be notified when a new field is
  // added
  if (!field) {
    form.internal.fieldNames;
  }

  // Return whether field is present and matches filter options
  return (
    !!field &&
    (!shouldActive || field.active) &&
    (!shouldTouched || field.touched) &&
    (!shouldDirty || field.dirty) &&
    (!shouldValid || !field.error)
  );
}