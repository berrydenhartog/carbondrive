import Repository from '@/repository/Repository';
const resource = '/contactemail';

export default {
    create(payload) {
        return Repository.post(`${resource}`, payload);
    },
};