export class LoginResponse {
  public artifactName: string;
  public name: string;
  public userId: number;
  public isSuperAdmin: string;
  public customTenantList: TenantList[];
}

export class TenantList {
  public roleId: number;
  public tenantId: number;
  public tenantName: string;
  public roleName: string;
  public artifactCategory: string;
}
