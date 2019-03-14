import { isEmpty } from 'lodash';
import { MapperUtils } from '@flogo-web/core';
import { typeMapper, AppImportsAgent } from '@flogo-web/server/core';
import { FLOGO_FLOW_DIAGRAM_FLOW_LINK_TYPE as LEGACY_LINK_TYPE } from '../constants';

export function formatLinks(links = [], importsAgent: AppImportsAgent) {
  const stdTypeMapper = typeMapper.toStandard();
  const registerFunction = (fn: string) => importsAgent.registerFunctionName(fn);
  return links.map(fromLink => {
    const type =
      fromLink.type !== LEGACY_LINK_TYPE.DEFAULT
        ? stdTypeMapper.linkTypes[fromLink.type]
        : undefined;
    if (!isEmpty(fromLink.value)) {
      MapperUtils.functions
        .parseAndExtractReferences(fromLink.value)
        .forEach(registerFunction);
    }
    return {
      ...fromLink,
      id: undefined,
      type,
    };
  });
}