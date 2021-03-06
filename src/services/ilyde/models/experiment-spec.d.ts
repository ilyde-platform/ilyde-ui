/**
 * Ilyde Apis
 * OpenApi interface which exposes Ilyde resources to frontends
 *
 * OpenAPI spec version: 0.2.0
 * Contact: alessiofiorentino@hopenly.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 *
 * @export
 * @interface ExperimentSpec
 */
export interface ExperimentSpec {
    /**
     *
     * @type {string}
     * @memberof ExperimentSpec
     */
    revision: any;
    /**
     *
     * @type {string}
     * @memberof ExperimentSpec
     */
    entrypoint: any;
    /**
     *
     * @type {Array&lt;ExperimentSpecParams&gt;}
     * @memberof ExperimentSpec
     */
    params?: any;
    /**
     *
     * @type {string}
     * @memberof ExperimentSpec
     */
    environment: any;
    /**
     *
     * @type {string}
     * @memberof ExperimentSpec
     */
    hardware: any;
    /**
     *
     * @type {Array&lt;WorkspaceSpecDatasets&gt;}
     * @memberof ExperimentSpec
     */
    datasets?: any;
}
