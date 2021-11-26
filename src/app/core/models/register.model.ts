export class RegisterModel {
  public email: number;
  public name: string;
  public tenantUser: TenantUser;
}

export class TenantUser {
  public tenantId: number;
  public tenantName: string;
}
