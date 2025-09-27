export function mediaCardTemplate(info) {
    return `<div class="media-card">
  <a href="${info.link}">
  <img src="${info.image}" alt="${info.name.replace('&#x203A;', '').trim()}" class="media-card__img">
  <h3 class="media-card__title">${info.name}</h3>
  </a> 
  <p>${info.description}</p>
  </div>`;
}

export function getMailingAddress(addresses) {
    const mailing = addresses.find((address) => address.type === "Mailing");
    return mailing;
}

export function getVoicePhone(numbers) {
    const voice = numbers.find((number) => number.type === "Voice");
    return voice.phoneNumber;
}

export function footerTemplate(info) {
    const mailing = getMailingAddress(info.addresses);
    const voice = getVoicePhone(info.contacts.phoneNumbers);

    return `<section class="contact">
  <h3>CONTACT INFO</h3>
  <h4>Mailing Address:</h4>
  <div><p>${mailing.line1}<p>
  <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
  <h4>Phone:</h4>
  <p>${voice}</p>
  </section>`;
}