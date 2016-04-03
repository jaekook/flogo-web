import {Injectable} from 'angular2/core';

@Injectable()
export class FlogoDBService{

  // PouchDB instance
  private _db:PouchDB;
  public PREFIX_AUTO_GENERATE:string = 'auto-generate-id';
  public FLOW:string = 'flows';
  public DIAGRAM:string = 'diagram';
  public DELIMITER:string = ":";
  public DEFAULT_USER_ID = 'flogoweb-admin';

  constructor(){
    // When create this service, initial pouchdb
    this._initDB();
  }

  /**
   * initial a pouchdb
   */
  private _initDB(): FlogoDBService{
    this._db = new PouchDB('flogo-web-local');
    // create db in browser
    this._db.info().then(function(db){
      console.log(db);
    }).catch(function(err:Object){
      console.error(err);
    });
    return this;
  }

  /**
   * generate a unique id
   */
  generateID(userID: string): string{
    // if userID isn't passed, then use default 'flogoweb'
    if(!userID){
      // TODO for now, is optional. When we implement user login, then this is required
      userID = this.DEFAULT_USER_ID;
    }
    let timestamp = new Date().toISOString();
    let random = Math.random();
    let id = `${this.PREFIX_AUTO_GENERATE}${this.DELIMITER}${userID}${this.DELIMITER}${timestamp}${this.DELIMITER}${random}`;

    return id;
  }

  /**
   * generate an id of flow
   * @param {string} [userID] - the id of currently user.
   */
  generateFlowID(userID: string): string{
    // if userID isn't passed, then use default 'flogoweb'
    if(!userID){
      // TODO for now, is optional. When we implement user login, then this is required
      userID = this.DEFAULT_USER_ID;
    }

    let timestamp = new Date().toISOString();
    let id = `${this.FLOW}${this.DELIMITER}${userID}${this.DELIMITER}${timestamp}`;

    console.log("[info]flowID: ", id);
    return id;
  }

  /**
   * create a doc to db
   * @param {Object} doc
   */
  create(doc: Object): Object{
    if(!doc) return;

    if(!doc.$table){
      console.error("[Error]doc.$table is required. You must pass. ", doc);
      return;
    }

    // if this doc don't have id, generate an id for it
    if(!doc._id){
      doc._id = this.generateID();
      console.log("[warning]We generate an id for you, but suggest you give a meaningful id to this document.");
    }

    if(!doc['created_at']){
      doc['created_at'] = new Date().toISOString();
    }

    return new Promise((resolve, reject)=>{
      this._db.put(doc).then((response)=>{
        console.log("response: ", response);
        resolve(response);
      }).catch((err)=>{
        console.error(err);
        reject(err);
      });
    });
  }

  /**
   * update a doc
   * @param {Object} doc
   */
  update(doc: Object): Object{
    if(!doc) return;

    // if this doc don't have id, generate an id for it
    if(!doc._id){
      console.error("[Error] Your doc don't have a valid _id");
      return;
    }

    if(!doc._rev){
      console.error("[Error] Your doc don't have valid _rev");
      return;
    }

    if(!doc['updated_at']){
      doc['updated_at'] = new Date().toISOString();
    }

    return new Promise((resolve, reject)=>{
      this._db.put(doc).then((response)=>{
        console.log("response: ", response);
        resolve(response);
      }).catch((err)=>{
        console.error(err);
        reject(err);
      });
    });
  }

  allDocs(options:Object){
    return new Promise((resolve, reject)=>{
      this._db.allDocs(options).then((response)=>{
        console.log("[allDocs]response: ", response);
        resolve(response);
      }).catch((err)=>{
        console.error(err);
      });
    });
  }

}
