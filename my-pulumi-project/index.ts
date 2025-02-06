import * as pulumi from '@pulumi/pulumi';
import * as azure from '@pulumi/azure';

const resourceGroup = new azure.core.ResourceGroup('my-resource-group', {
  location: 'East US',
});

const storageAccount = new azure.storage.Account('myStorageAccount', {
  resourceGroupName: resourceGroup.name,
  location: resourceGroup.location,
  accountTier: 'Standard',
  accountReplicationType: 'LRS',
});

export const resourceGroupName = resourceGroup.name;
export const storageAccountName = storageAccount.name;
