(() => {
  // Name
  const name = document.querySelector('h1[class*="break-words"]')?.innerText.trim();

  // Short Description
  const shortDesc = document.querySelector('div.text-body-medium.break-words[data-generated-suggestion-target]')?.innerText.trim();

  // Location Profile
  const locationProfile = document.querySelector('span.text-body-small.inline.t-black--light.break-words')?.innerText.trim();

  // Experience Section
  const experienceSection = document.getElementById('experience');
  const expList = experienceSection ? experienceSection.parentElement.querySelector('ul > li') : null;
  const experiences = expList ? [{
    position: expList.querySelector('span[aria-hidden="true"]')?.innerText.trim(),
    companyName: expList.querySelector('span.t-14.t-normal span[aria-hidden="true"]')?.innerText.trim().split('·')[0]?.trim(),
    companyUrl: expList.querySelector('a')?.href,
    jobType: expList.querySelector('span.t-14.t-normal span[aria-hidden="true"]')?.innerText.trim().split('·')[1]?.trim(),
    fromTo: expList.querySelector('span.pvs-entity__caption-wrapper')?.innerText.trim(),
    jobLocation: expList.querySelectorAll('span.t-14.t-normal.t-black--light span[aria-hidden="true"]')[1]?.innerText.trim().split('·')[0]?.trim(),
    mode: expList.querySelectorAll('span.t-14.t-normal.t-black--light span[aria-hidden="true"]')[1]?.innerText.trim().split('·')[1]?.trim(),
  }] : [];

  // Sidebar Section
  const sidebarSections = document.querySelectorAll('section.artdeco-card.pv-profile-card');
  const moreProfiles = [...sidebarSections].find(section => section.querySelector('h2')?.innerText.includes('More profiles for you'));
  const peopleYouMayKnow = [...sidebarSections].find(section => section.querySelector('h2')?.innerText.includes('People you may know'));
  const youMightLike = [...sidebarSections].find(section => section.querySelector('h2')?.innerText.includes('You might like'));

  const getProfiles = (section) => {
    if (!section) return [];
    const profileItems = section.querySelectorAll('li.artdeco-list__item');
    return [...profileItems].map(item => {
      const name = item.querySelector('.hoverable-link-text span[aria-hidden="true"]')?.innerText.trim();
      const url = item.querySelector('a')?.href.split('?')[0];
      const allTextNodes = [...item.querySelectorAll('span[aria-hidden="true"]')].map(n => n.innerText.trim());
      const shortDesc = allTextNodes.find(t => t.length > name.length);
      return { name, url, shortDesc };
    });
  };

  // Output Final Structured Result
  const profileData = {
    name,
    shortDesc,
    locationProfile,
    experiences,
    moreProfiles: getProfiles(moreProfiles),
    peopleYouMayKnow: getProfiles(peopleYouMayKnow),
    youMightLike: getProfiles(youMightLike)
  };

  console.log(`
✅ Extracted Profile Data:

--- Main Profile ---
Name: ${profileData.name}
Short Description: ${profileData.shortDesc}
Location: ${profileData.locationProfile}

--- Experience ---
${profileData.experiences.map(exp => `
Position: ${exp.position}
Company: ${exp.companyName} (${exp.jobType})
Company URL: ${exp.companyUrl}
Duration: ${exp.fromTo}
Location: ${exp.jobLocation} (${exp.mode})
`).join('\n')}

--- More Profiles For You ---
${profileData.moreProfiles.map(p => `
Name: ${p.name}
Short Description: ${p.shortDesc}
URL: ${p.url}
`).join('\n')}

--- People You May Know ---
${profileData.peopleYouMayKnow.map(p => `
Name: ${p.name}
Short Description: ${p.shortDesc}
URL: ${p.url}
`).join('\n')}

--- You Might Like ---
${profileData.youMightLike.map(p => `
Name: ${p.name}
Short Description: ${p.shortDesc}
URL: ${p.url}
`).join('\n')}
  `);
})();
