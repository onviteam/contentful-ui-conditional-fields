import React from 'react';
import {
  EntityList,
  EntityListItem,
  Option,
  SectionHeading,
  SelectField,
  Textarea,
  TextInput
} from '@contentful/forma-36-react-components';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { FIELD_TYPES } from './constants';

function renderWidget(field, changeHandler) {
  if (field.omitted) {
    return null;
  }

  const ids = {
    field: `field-${field.id}`,
    wrapper: `field-wrapper-${field.id}`
  };

  const { disabled, required, value } = field;

  switch (field.type) {
    case FIELD_TYPES.Symbol:
      if (field.options.length) {
        return (
          <div id={ids.wrapper} key={ids.field}>
            <SectionHeading>{field.label}</SectionHeading>
            <SelectField
              width="auto"
              labelText=""
              id={ids.field}
              name={ids.field}
              value={value}
              disabled={disabled}
              required={required}
              onChange={changeHandler}>
              {field.options.map(option => (
                <Option value={option} key={option}>
                  {option}
                </Option>
              ))}
            </SelectField>
          </div>
        );
      }
    // if it's not a vocabulary we'll let other Symbols fall in the default case
    // eslint-disable-next-line no-fallthrough
    case FIELD_TYPES.Text:
      return (
        <div id={ids.wrapper} key={ids.field}>
          <SectionHeading>{field.label}</SectionHeading>
          <Textarea
            disabled={disabled}
            required={required}
            testId={ids.field}
            value={value}
            onChange={changeHandler}
          />
        </div>
      );
    case FIELD_TYPES.Array:
    case FIELD_TYPES.Listing:
      // https://github.com/contentful-labs/ui-reference-quick-select/blob/master/index.html
      return (
        <div id={ids.wrapper} key={ids.field}>
          <SectionHeading>{field.label}</SectionHeading>
          <p>Widget in progress</p>
          <EntityList disabled={disabled} required={required}>
            <EntityListItem
              title="Entry 1"
              description="Work in progress"
              contentType="Item"
              status="published"
            />
          </EntityList>
        </div>
      );
    case FIELD_TYPES.RichText:
      // https://www.contentful.com/developers/docs/javascript/tutorials/rendering-contentful-rich-text-with-javascript/
      return documentToHtmlString(field);
    case FIELD_TYPES.Boolean:
    case FIELD_TYPES.Date:
    case FIELD_TYPES.Integer:
    case FIELD_TYPES.Number:
    case FIELD_TYPES.Object:
    default:
      return (
        <div id={ids.wrapper} key={ids.field}>
          <SectionHeading>{field.label}</SectionHeading>
          <TextInput
            testId={ids.field}
            disabled={disabled}
            onChange={changeHandler}
            value={value?.toString()}
          />
        </div>
      );
  }
}

export { renderWidget };
