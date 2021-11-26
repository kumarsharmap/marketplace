export class CreateTenantModel {
  public tenantId: number;
  public artifactTitle: string;
  public tenantName: string;
  public tenantDescription: string;
  public tenantUser: CreateTenantAddUserModel[];
  public artifactCategory: string;
  public selectLocation: boolean[];
}

export class CreateTenantAddUserModel {
  public userId: number;
  public email: string;
  public roleId: number;
  public roleName: string;
  public name?: string;
  public tenantId?: number;
  public tenantName: string;
}
