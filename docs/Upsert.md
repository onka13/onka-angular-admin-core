## Detail Page

```
<onka-upsert 
    [pageConfig]="pageConfig" 
    [inputColumns]="inputColumns" 
    [initialValues]="initialValues"
></onka-upsert>

....

initialValues = {
    status: adminApiEnums.Status.Active,
    theme: adminApiEnums.AdminUserTheme.Light
};
constructor(onkaService: OnkaService)
{
    // You can add or remove columns 
    this.inputColumns = onkaService.getUpsertInputColumns(pageConfig);
}

```

### Using Tabs

```
<onka-upsert [pageConfig]="pageConfig">
    <onka-tab-group>
        <onka-tab label="tab1" [pageFields]="tab1Fields"></onka-tab>
        <onka-tab label="tab2" [pageFields]="tab2Fields"></onka-tab>
    </onka-tab-group>
</onka-upsert>

```

