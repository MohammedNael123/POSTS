const app = new Vue({
    el: '#app',
    data: {
        posts: [
            { id: 1, title: 'First Post', description: 'This is the first post.', time: '10:00 AM', timer: '0.01' },
            { id: 2, title: 'Second Post', description: 'This is the second post.', time: '11:30 AM', timer: '2.01' },
        ],
        formData: {
            id: null,
            title: '',
            description: '',
            time: '',
            timer: ''
        },
        editing: false,
        showModal: false,
        timer: null,
        startTime: null
    },
    methods: {
        deletePost(id) {
            if (window.confirm('Are you sure you want to delete this post?')) {
                this.posts = this.posts.filter(post => post.id !== id);
            }
        },

        showEditModal(post) {
            this.formData.id = post.id;
            this.formData.title = post.title;
            this.formData.description = post.description;
            this.formData.time = post.time;
            this.editing = true;
            this.showModal = true;
        },

        openCreateModal() {
            this.resetForm();
            this.editing = false;
            this.showModal = true;
            this.startTimer();
        },

        savePost() {
            if (this.editing) {
                const index = this.posts.findIndex(post => post.id === this.formData.id);
                if (index !== -1) {
                    this.posts[index] = { ...this.formData };
                }
            } else {
                const newId = this.posts.length > 0 ? this.posts[this.posts.length - 1].id + 1 : 1;
                this.formData.time = this.getCurrentTime();
                this.stopTimer();
                this.posts.push({ id: newId, ...this.formData });
            }
            this.resetForm();
            this.closeModal();
        },

        startTimer() {
            this.startTime = new Date();
            this.timer = setInterval(() => {
                const now = new Date();
                const elapsed = new Date(now - this.startTime);
                const minutes = elapsed.getUTCMinutes();
                const seconds = elapsed.getUTCSeconds();
                this.formData.timer = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            }, 1000);
        },

        stopTimer() {
            clearInterval(this.timer);
            this.timer = null;
        },

        getCurrentTime() {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        },

        resetForm() {
            this.formData.id = null;
            this.formData.title = '';
            this.formData.description = '';
            this.formData.time = '';
            this.formData.timer = '';
            this.editing = false;
        },

        closeModal() {
            this.stopTimer();
            this.showModal = false;
        }
    }
});
