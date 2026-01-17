import { FormGroup } from '@angular/forms';

export abstract class CrudFormPage<T> {
  protected abstract loadEntity(id: number): T | undefined;
  protected abstract createEntity(data: Partial<T>): any;
  protected abstract updateEntity(id: number, data: Partial<T>): any;

  entityId?: number;

  init(id?: number) {
    this.entityId = id;

    if (id) {
      const data = this.loadEntity(id);
      if (data) this.form.patchValue(data);
    }
  }

  submit() {
    if (this.entityId) {
      return this.updateEntity(this.entityId, this.form.value);
    }
    return this.createEntity(this.form.value);
  }

  abstract form: FormGroup;
}
