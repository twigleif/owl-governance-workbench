/* Permission catalogue for the fictional preview; no authentication or persisted grants. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.OWLTeamAccessModel = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const PERMISSIONS = Object.freeze([
    { id: 'organization.view', label: 'View organization', group: 'Organization', scope: 'organization' },
    { id: 'organization.edit', label: 'Edit organization context', group: 'Organization', scope: 'organization' },
    { id: 'people.manage', label: 'Manage people', group: 'Administration', scope: 'organization' },
    { id: 'roles.manage', label: 'Manage roles', group: 'Administration', scope: 'organization' },
    { id: 'system.view', label: 'View system workspace', group: 'System', scope: 'system' },
    { id: 'system.access.manage', label: 'Manage system access', group: 'System', scope: 'system' },
    { id: 'task.assign', label: 'Assign work', group: 'System', scope: 'system' },
    { id: 'frameworks.manage', label: 'Manage framework scope', group: 'System', scope: 'system' },
    { id: 'agent.prepare', label: 'Prepare work with OWL', group: 'Work', scope: 'system' },
    { id: 'check.record', label: 'Record checks and observations', group: 'Work', scope: 'system' },
    { id: 'review.record', label: 'Review prepared work', group: 'Review and decisions', scope: 'system' },
    { id: 'proposal.apply', label: 'Apply reviewed proposals', group: 'Review and decisions', scope: 'system' },
    { id: 'decision.record', label: 'Record authorized decisions', group: 'Review and decisions', scope: 'system' },
    { id: 'context.add', label: 'Add context sources', group: 'Context', scope: 'both' },
    { id: 'context.remove', label: 'Remove context sources', group: 'Context', scope: 'both' }
  ].map(Object.freeze));

  const DEFAULT_ROLES = Object.freeze([
    { id: 'org-admin', name: 'Organization administrator', scopeType: 'organization', protected: true,
      permissions: ['organization.view', 'organization.edit', 'people.manage', 'roles.manage', 'context.add', 'context.remove'] },
    { id: 'org-member', name: 'Organization member', scopeType: 'organization', permissions: ['organization.view'] },
    { id: 'system-manager', name: 'System manager', scopeType: 'system',
      permissions: ['system.view', 'system.access.manage', 'task.assign', 'frameworks.manage', 'agent.prepare', 'context.add', 'context.remove', 'check.record', 'review.record', 'proposal.apply'] },
    { id: 'contributor', name: 'Contributor', scopeType: 'system', permissions: ['system.view', 'agent.prepare', 'context.add', 'check.record'] },
    { id: 'reviewer', name: 'Reviewer', scopeType: 'system', permissions: ['system.view', 'agent.prepare', 'review.record', 'proposal.apply'] },
    { id: 'viewer', name: 'Viewer', scopeType: 'system', permissions: ['system.view'] },
    { id: 'decision-maker', name: 'Decision maker', scopeType: 'system', permissions: ['system.view', 'decision.record'] }
  ].map(role => Object.freeze({ ...role, permissions: Object.freeze(role.permissions) })));

  const ASSIGNMENT_FIELDS = Object.freeze([
    { id: 'systemOwnerId', label: 'System owner', permission: 'system.view' },
    { id: 'technicalOwnerId', label: 'Technical owner', permission: 'check.record' },
    { id: 'reviewerId', label: 'Reviewer', permission: 'review.record' },
    { id: 'decisionMakerId', label: 'Decision maker', permission: 'decision.record' }
  ].map(Object.freeze));

  const permissionById = new Map(PERMISSIONS.map(permission => [permission.id, permission]));
  const roleScope = scope => scope === 'organization' ? 'organization' : scope === 'docent' ? 'system' : null;
  const compatible = (permission, scopeType) => permission && (permission.scope === 'both' || permission.scope === scopeType);
  const invalid = error => ({ ok: false, error });
  const normalizedName = name => name.trim().replace(/\s+/g, ' ').toLocaleLowerCase('en-US');

  function validateRole(candidate, roles = [], exceptId = null) {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return invalid('Enter a role name, scope and permissions.');
    const { name, scopeType, permissions } = candidate;
    if (typeof name !== 'string' || !name.trim() || name.length > 120 || /[\u0000-\u001f\u007f]/.test(name)) {
      return invalid('Enter a role name of 1 to 120 characters.');
    }
    if (!['organization', 'system'].includes(scopeType)) return invalid('Choose Organization or System as the role scope.');
    if (!Array.isArray(permissions) || !permissions.length) return invalid('Choose at least one permission for this role.');
    if (permissions.some(id => typeof id !== 'string' || !permissionById.has(id))) return invalid('Choose permissions from the supported list.');
    if (new Set(permissions).size !== permissions.length) return invalid('Select each permission only once.');
    if (permissions.some(id => !compatible(permissionById.get(id), scopeType))) return invalid('Choose permissions that belong to this role scope.');
    if (scopeType === 'system' && !permissions.includes('system.view')) return invalid('Include View system workspace so this role can open its work.');
    if (Array.isArray(roles) && roles.some(role => role && role.id !== exceptId && typeof role.name === 'string' && normalizedName(role.name) === normalizedName(name))) {
      return invalid('A role with this name already exists. Edit that role or choose a different name.');
    }
    return { ok: true };
  }

  function scopedRoles(state, personId, scope) {
    const scopeType = roleScope(scope);
    if (!scopeType || !state || !Array.isArray(state.people) || !Array.isArray(state.roles)) return [];
    const people = state.people.filter(person => person && person.id === personId);
    if (people.length !== 1 || people[0].status !== 'active' || !Array.isArray(people[0].grants)) return [];
    const result = [];
    for (const grant of people[0].grants) {
      if (!grant || grant.scope !== scope) continue;
      const matching = state.roles.filter(role => role && role.id === grant.roleId);
      if (matching.length !== 1) continue;
      const role = matching[0];
      if (role.scopeType !== scopeType || !validateRole(role).ok || result.some(item => item.id === role.id)) continue;
      result.push(role);
    }
    return result;
  }

  function permissionsFor(state, personId, scope) {
    const scopeType = roleScope(scope);
    if (!scopeType) return [];
    const granted = new Set(scopedRoles(state, personId, scope).flatMap(role => role.permissions));
    if (scopeType === 'system' && !granted.has('system.view')) return [];
    return PERMISSIONS.filter(permission => compatible(permission, scopeType) && granted.has(permission.id)).map(permission => permission.id);
  }

  function evaluate(state, personId, permissionId, scope) {
    const scopeType = roleScope(scope);
    const denied = reason => ({ allowed: false, reason, roleIds: [], scope });
    if (!scopeType) return denied('Choose the Organization or Docent scope.');
    const permission = permissionById.get(permissionId);
    if (!permission) return denied('This action is not a supported permission.');
    if (!compatible(permission, scopeType)) return denied('This permission belongs to a different scope.');
    const people = Array.isArray(state?.people) ? state.people.filter(person => person && person.id === personId) : [];
    if (people.length !== 1) return denied('This sample person is unavailable.');
    if (people[0].status !== 'active') return denied('This sample person is inactive. Choose an active person.');
    const roles = scopedRoles(state, personId, scope);
    const available = new Set(roles.flatMap(role => role.permissions));
    if (scopeType === 'system' && !available.has('system.view')) return denied('This person needs a role granting access to Docent.');
    const roleIds = roles.filter(role => role.permissions.includes(permissionId)).map(role => role.id);
    if (!roleIds.length) return denied('This person has no role granting this action in the selected scope.');
    return { allowed: true, reason: 'Granted by the assigned role in this scope.', roleIds, scope };
  }

  return Object.freeze({ PERMISSIONS, DEFAULT_ROLES, ASSIGNMENT_FIELDS, evaluate, permissionsFor, validateRole });
});
