import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPhoto(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsPhoto',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value && value.mimetype.startsWith('image/');
        },
        defaultMessage() {
          return 'O arquivo deve ser uma imagem';
        },
      },
    });
  };
}
