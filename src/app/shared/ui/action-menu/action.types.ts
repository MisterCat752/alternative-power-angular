export type UiActionItem = {
  label: string;
  icon?: string; // например: 'eye', 'edit'
  type?: 'link' | 'button'; // по умолчанию button
  href?: string; // если link
  danger?: boolean; // красная кнопка
  disabled?: boolean;
  action?: string; // ключ события
};
