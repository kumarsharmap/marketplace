export class UserManagementModel {
  public userId: number;
  public email: string;
  public name: string;
  public tenantUser: UserManagementTenantModel[];
}

export class UserManagementTenantModel {
  public tenantId?: number;
  public tenantName?: string;
  public roleName: string;
  public roleId: number;
  public artifactCategory?: string;
  public tenantDescription?: string;
}
