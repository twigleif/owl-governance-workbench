'use strict';
(function(){
const paths={home:'M3 10l9-7 9 7v11h-6v-7H9v7H3z',systems:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',file:'M6 3h8l4 4v14H6zM14 3v5h5M9 12h6M9 16h6',org:'M4 21V5l8-3 8 3v16M8 7h1M15 7h1M8 11h1M15 11h1M8 15h1M15 15h1M10 21v-3h4v3',arrow:'M5 12h14M14 7l5 5-5 5',chevron:'M9 6l6 6-6 6',close:'M6 6l12 12M18 6L6 18',risk:'M12 3L2 21h20zM12 9v5M12 17h.01',shield:'M12 3l8 3v6c0 5-8 9-8 9S4 17 4 12V6zM8 12l3 3 5-6',check:'M5 12l4 4L19 6',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',chat:'M4 4h16v13H9l-5 4z',save:'M5 3h12l3 3v15H4V3zM8 3v6h8V3M8 21v-8h8v8',history:'M3 12a9 9 0 1 0 3-6M3 3v5h5M12 7v5l4 2',undo:'M9 6L3 12l6 6M3 12h11a7 7 0 0 1 7 7',more:'M5 12h.01M12 12h.01M19 12h.01',download:'M12 3v12M7 10l5 5 5-5M4 17v4h16v-4',send:'M12 20V4M6 10l6-6 6 6',plus:'M12 5v14M5 12h14',settings:'M4 7h16M4 17h16M8 4v6M16 14v6',stop:'M7 7h10v10H7z'};
// Each navigation destination has its own glyph; repeated actions keep their familiar icon.
Object.assign(paths,{
 evidence:'M4 7h16v14H4zM3 3h18v4H3zM9 11h6M10 15h4',
 work:'M4 7h16v14H4zM8 7V3h8v4M4 12h16M10 12v3h4v-3',
 governance:'M9 3h6v6H9zM2 15h6v6H2zM16 15h6v6h-6zM12 9v3M5 15v-3h14v3',
 documents:'M8 3h10l3 3v12H8zM18 3v4h3M4 7H3v14h13v-1M11 11h7M11 14h5',
 assurance:'M12 2l3 2 4 1 1 4 2 3-2 3-1 4-4 1-3 2-3-2-4-1-1-4-2-3 2-3 1-4 4-1zM8 12l3 3 5-6',
 deliverables:'M3 7l9-4 9 4v11l-9 4-9-4zM3 7l9 4 9-4M12 11v11M8 5l9 4',
 requirements:'M8 4h13M8 10h13M8 16h13M3 3v3M2 10h3l-3 3h3M2 17h3l-2 2 2 2H2',
 controls:'M5 3v5M5 14v7M12 3v11M12 20v1M19 3v1M19 10v11M2 8h6v6H2zM9 14h6v6H9zM16 4h6v6h-6z',
 organizationRisk:'M12 2l10 10-10 10L2 12zM12 7v6M12 17h.01',
 objectives:'M21 12a9 9 0 1 1-9-9M17 12a5 5 0 1 1-5-5M12 12l9-9M16 3h5v5',
 actions:'M5 3h14v18H5zM9 2h6v4H9zM8 11l2 2 3-4M14 11h2M8 17h8',
 decisions:'M13 3l8 8-4 4-8-8zM6 6l3-3M17 17l4-4M11 11l-8 8M3 21h11'
});

const pages=[['Work','work'],['Governance','governance'],['Documents','documents'],['Assurance','assurance'],['Deliverables','deliverables']];
const governancePages=[['Requirements','requirements'],['Controls','controls'],['Risks','organizationRisk'],['Objectives & metrics','objectives'],['Actions','actions'],['Decisions','decisions']];
function create({getState,button:btn,icon,render}){
const navExpanded={organization:false,governance:false};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const navId=value=>'j-nav-'+value.toLowerCase().replace(/[^a-z0-9]+/g,'-');
const organizationPages=pages,organizationGovernance=governancePages;
function sidebarNavigation(isSystem){
 const s=getState(),isSystemView=isSystem;const inOrganization=s.view==='organization',inGovernance=inOrganization&&s.orgTab==='Governance';
 const item=(label,name,action,extra='',selected=false)=>btn(icon(name)+`<span class="nav-label">${esc(label)}</span>`,action,selected?'selected':'',`data-nav-item id="${navId(label)}" title="${esc(label)}" aria-label="${esc(label)}" ${selected?'aria-current="page"':''} ${extra}`);
 const disclosure=(label,branch)=>btn(icon('chevron'),'organization-toggle','j-nav-toggle',`id="j-toggle-${branch}" data-branch="${branch}" aria-label="${navExpanded[branch]?'Collapse':'Expand'} ${label}" aria-expanded="${navExpanded[branch]}" aria-controls="j-nav-${branch}-pages" title="${navExpanded[branch]?'Collapse':'Expand'} ${label}"`);
 const governanceItems=organizationGovernance.map(([label,name])=>`<li>${item(label,name,'organization-governance',`data-value="${esc(label)}" data-nav-parent="governance"`,inGovernance&&s.gov===label)}</li>`).join('');
 const children=organizationPages.map(([label,name])=>{
  if(label==='Governance')return`<li><div class="j-nav-heading${inGovernance?' j-nav-context':''}">${item(label,name,'organization-page','data-value="Governance" data-nav-branch="governance" data-nav-parent="organization"')}${disclosure('Governance','governance')}</div><ul id="j-nav-governance-pages" class="j-nav-children j-nav-grandchildren" ${navExpanded.governance?'':'hidden'}>${navExpanded.governance?governanceItems:''}</ul></li>`;
  return`<li>${item(label,name,'organization-page',`data-value="${label}" data-nav-parent="organization"`,inOrganization&&s.orgTab===label)}</li>`;
 }).join('');
 return`<nav id="j-primary-nav" class="nav j-primary-nav" aria-label="Main navigation"><ul class="j-nav-root">${[['home','Home','home'],['systems','AI Systems','systems'],['evidence','Evidence','evidence']].map(([id,label,name])=>`<li>${item(label,name,'sidebar-route',`data-value="${id}"`,s.view===id||(isSystem&&id==='systems'))}</li>`).join('')}<li><div class="j-nav-heading${inOrganization?' j-nav-context':''}">${item('Organization','org','sidebar-route','data-value="organization" data-nav-branch="organization"')}${disclosure('Organization','organization')}</div><ul id="j-nav-organization-pages" class="j-nav-children" ${navExpanded.organization?'':'hidden'}>${navExpanded.organization?children:''}</ul></li></ul></nav>`;
}
function sidebarKeydown(e){
 const n=e.target.closest('[data-nav-item]');if(!n||!n.closest('#j-primary-nav'))return;
 const nav=document.getElementById('j-primary-nav'),items=[...nav.querySelectorAll('[data-nav-item]')],i=items.indexOf(n),branch=n.dataset.navBranch;
 if(['ArrowUp','ArrowDown','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?items.length-1:Math.max(0,Math.min(items.length-1,i+(e.key==='ArrowDown'?1:-1)));items[next]?.focus();}
 if(e.key==='ArrowRight'&&branch){e.preventDefault();if(!navExpanded[branch]){navExpanded[branch]=true;render();}document.getElementById('j-nav-'+branch+'-pages')?.querySelector('[data-nav-item]')?.focus();}
 if(e.key==='ArrowLeft'){e.preventDefault();if(branch&&navExpanded[branch]){navExpanded[branch]=false;render();}else if(n.dataset.navParent)document.getElementById(navId(n.dataset.navParent))?.focus();}
}
return{render:sidebarNavigation,key:sidebarKeydown,enter(page){navExpanded.organization=true;if(page==='Governance')navExpanded.governance=true;},toggle(branch){if(branch in navExpanded)navExpanded[branch]=!navExpanded[branch];}};
}
window.OWLOrganizationNavigation={create,paths,pages,governancePages};
})();
