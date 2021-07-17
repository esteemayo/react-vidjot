import http from './httpService';

const apiEndPoint = '/ideas';

function ideaUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getIdeas() {
  return http.get(apiEndPoint);
}

export function getIdea(id) {
  return http.get(ideaUrl(id));
}

export function createIdea(idea) {
  return http.post(apiEndPoint, idea);
}

export function updateIdea(id, idea) {
  return http.patch(ideaUrl(id), idea);
}

export function deleteIdea(id) {
  return http.delete(ideaUrl(id));
}
