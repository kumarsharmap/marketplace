export class ApprovalQueueModel {
  public artifactId: number;
  public artifactTitle: string;
  public artifactDescription: string;
  public tenantId: number;
  public tenantName: string;
  public artifactCategory: string;
  public createdBy: string;
  public createdon: Date;
  public lastModifiedon: Date;
  public status: string;
  public active: boolean;
}

export class ArtifactModel {
  public id?: number;
  public type: string;
  public artifactId?: number;
}
