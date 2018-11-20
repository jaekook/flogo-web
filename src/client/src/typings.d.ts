/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/*  */
import * as __lodash from 'lodash';
import * as __jQuery from 'jquery';
import 'monaco-editor/monaco.d';

declare global {
  const _: typeof __lodash;
}