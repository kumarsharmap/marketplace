export class RoleModel {
  public roleId: number;
  public roleName: string;
  public roleDescription: string;
  public rolePermission: RolePermission[];
}

export class RolePermission {
  public permissionId: number;
  public permissionName: string;
  public rolePermissionId?: number;
}
