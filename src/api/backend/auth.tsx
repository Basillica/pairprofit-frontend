import { ApiHandler } from "./base";

export class AuthApiHandler extends ApiHandler {
  async fetchComponent(id: string) {
    return await this.get(`/v1/components/component/${id}`);
  }

  async fetchComponents() {
    return await this.get(`/v1/components/components`);
  }

  async fetchComponentsByMachineID(machine_id: string) {
    return await this.get(`/v1/components/components/${machine_id}`);
  }

  async isComponentNameValid(name: string) {
    return await this.get(`/v1/components/valid/${name}`);
  }

  async deleteComponent(component_id: string) {
    return await this.delete(`/v1/components/component/delete/${component_id}`);
  }
}
