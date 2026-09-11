// ===== TODO APP - GESTION COMPLÈTE DES TÂCHES ===== 

class TodoApp {
    constructor() {
        // Configuration
        this.STORAGE_KEY = 'todoAppData';
        this.categories = {
            all: 'Toutes les tâches',
            work: 'Travail',
            personal: 'Personnes',
            shopping: 'Courses',
            health: 'Santé'
        };
        this.priorities = ['low', 'medium', 'high'];
        
        // État de l'app
        this.tasks = [];
        this.currentCategory = 'all';
        this.currentFilter = 'all';
        this.currentSort = 'date-desc';
        this.searchTerm = '';
        this.editingTaskId = null;
        
        // Éléments DOM
        this.elements = this.initElements();
        
        // Charger les données
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    // ===== INITIALISATION DES ÉLÉMENTS DOM =====
    initElements() {
        return {
            // Input
            taskInput: document.getElementById('taskInput'),
            taskCategory: document.getElementById('taskCategory'),
            taskPriority: document.getElementById('taskPriority'),
            searchInput: document.getElementById('searchInput'),
            
            // Boutons
            addTaskBtn: document.getElementById('addTaskBtn'),
            clearAllBtn: document.getElementById('clearAllBtn'),
            exportBtn: document.getElementById('exportBtn'),
            
            // Affichage
            tasksList: document.getElementById('tasksList'),
            headerTitle: document.getElementById('headerTitle'),
            headerSubtitle: document.getElementById('headerSubtitle'),
            
            // Stats
            statTotal: document.getElementById('statTotal'),
            statCompleted: document.getElementById('statCompleted'),
            statPending: document.getElementById('statPending'),
            statHigh: document.getElementById('statHigh'),
            
            // Catégories
            categoriesList: document.getElementById('categoriesList'),
            
            // Filtres
            filterBtns: document.querySelectorAll('.filter-btn'),
            sortSelect: document.getElementById('sortSelect'),
            
            // Modal
            editModal: document.getElementById('editModal'),
            editTaskInput: document.getElementById('editTaskInput'),
            editTaskCategory: document.getElementById('editTaskCategory'),
            editTaskPriority: document.getElementById('editTaskPriority'),
            closeModalBtn: document.getElementById('closeModalBtn'),
            cancelEditBtn: document.getElementById('cancelEditBtn'),
            saveEditBtn: document.getElementById('saveEditBtn')
        };
    }

    // ===== CONFIGURATION DES EVENT LISTENERS =====
    setupEventListeners() {
        // Ajouter une tâche
        this.elements.addTaskBtn.addEventListener('click', () => this.addTask());
        this.elements.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        
        // Recherche
        this.elements.searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.renderTasks();
        });
        
        // Catégories
        this.elements.categoriesList.addEventListener('click', (e) => {
            const item = e.target.closest('.category-item');
            if (item) {
                this.currentCategory = item.dataset.category;
                this.updateCategoryUI();
                this.renderTasks();
            }
        });
        
        // Filtres
        this.elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.elements.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.renderTasks();
            });
        });
        
        // Tri
        this.elements.sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderTasks();
        });
        
        // Boutons d'action
        this.elements.clearAllBtn.addEventListener('click', () => this.clearAll());
        this.elements.exportBtn.addEventListener('click', () => this.exportData());
        
        // Modal
        this.elements.closeModalBtn.addEventListener('click', () => this.closeModal());
        this.elements.cancelEditBtn.addEventListener('click', () => this.closeModal());
        this.elements.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.elements.editModal.addEventListener('click', (e) => {
            if (e.target === this.elements.editModal) this.closeModal();
        });
    }

    // ===== GESTION DES TÂCHES =====
    addTask() {
        const text = this.elements.taskInput.value.trim();
        const category = this.elements.taskCategory.value;
        const priority = this.elements.taskPriority.value;
        
        // Validation
        if (!text) {
            this.showNotification('Veuillez entrer une tâche', 'error');
            return;
        }
        
        if (text.length > 200) {
            this.showNotification('La tâche ne doit pas dépasser 200 caractères', 'error');
            return;
        }
        
        // Créer la tâche
        const task = {
            id: Date.now(),
            text,
            category,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(task);
        this.saveToStorage();
        this.render();
        
        // Réinitialiser l'input
        this.elements.taskInput.value = '';
        this.showNotification('Tâche ajoutée ✅', 'success');
    }

    deleteTask(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveToStorage();
            this.render();
            this.showNotification('Tâche supprimée', 'info');
        }
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            this.render();
        }
    }

    openEditModal(id) {
        this.editingTaskId = id;
        const task = this.tasks.find(t => t.id === id);
        
        if (task) {
            this.elements.editTaskInput.value = task.text;
            this.elements.editTaskCategory.value = task.category;
            this.elements.editTaskPriority.value = task.priority;
            this.elements.editModal.classList.add('active');
            this.elements.editTaskInput.focus();
        }
    }

    closeModal() {
        this.elements.editModal.classList.remove('active');
        this.editingTaskId = null;
    }

    saveEdit() {
        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (task) {
            task.text = this.elements.editTaskInput.value.trim();
            task.category = this.elements.editTaskCategory.value;
            task.priority = this.elements.editTaskPriority.value;
            
            this.saveToStorage();
            this.render();
            this.closeModal();
            this.showNotification('Tâche modifiée ✏️', 'success');
        }
    }

    clearAll() {
        if (confirm('Êtes-vous sûr de vouloir supprimer TOUTES les tâches ?')) {
            this.tasks = [];
            this.saveToStorage();
            this.render();
            this.showNotification('Toutes les tâches ont été supprimées', 'warning');
        }
    }

    // ===== FILTRAGE ET TRIAGE =====
    getFilteredTasks() {
        let filtered = this.tasks;
        
        // Filtrer par catégorie
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(t => t.category === this.currentCategory);
        }
        
        // Filtrer par statut
        if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        } else if (this.currentFilter === 'pending') {
            filtered = filtered.filter(t => !t.completed);
        }
        
        // Filtrer par recherche
        if (this.searchTerm) {
            filtered = filtered.filter(t => 
                t.text.toLowerCase().includes(this.searchTerm)
            );
        }
        
        // Trier
        filtered = this.sortTasks(filtered);
        
        return filtered;
    }

    sortTasks(tasks) {
        const sorted = [...tasks];
        
        switch (this.currentSort) {
            case 'date-asc':
                return sorted.sort((a, b) => 
                    new Date(a.createdAt) - new Date(b.createdAt)
                );
            case 'priority':
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return sorted.sort((a, b) => 
                    priorityOrder[a.priority] - priorityOrder[b.priority]
                );
            case 'name':
                return sorted.sort((a, b) => 
                    a.text.localeCompare(b.text)
                );
            case 'date-desc':
            default:
                return sorted.sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
        }
    }

    // ===== CALCUL DES STATISTIQUES =====
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const high = this.tasks.filter(t => t.priority === 'high').length;
        
        this.elements.statTotal.textContent = total;
        this.elements.statCompleted.textContent = completed;
        this.elements.statPending.textContent = pending;
        this.elements.statHigh.textContent = high;
    }

    updateCategoryCounts() {
        const counts = {};
        this.tasks.forEach(task => {
            counts[task.category] = (counts[task.category] || 0) + 1;
        });
        
        document.querySelectorAll('.category-item').forEach(item => {
            const category = item.dataset.category;
            const count = category === 'all' ? this.tasks.length : (counts[category] || 0);
            item.querySelector('.category-count').textContent = count;
        });
    }

    updateCategoryUI() {
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-category="${this.currentCategory}"]`).classList.add('active');
        
        const categoryName = this.categories[this.currentCategory];
        this.elements.headerTitle.textContent = categoryName;
        
        const filtered = this.getFilteredTasks();
        this.elements.headerSubtitle.textContent = `Vous avez ${filtered.length} tâche(s)`;
    }

    // ===== RENDU DE L'INTERFACE =====
    render() {
        this.updateStats();
        this.updateCategoryCounts();
        this.updateCategoryUI();
        this.renderTasks();
    }

    renderTasks() {
        const filtered = this.getFilteredTasks();
        
        if (filtered.length === 0) {
            this.elements.tasksList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🎯</div>
                    <h3>Aucune tâche</h3>
                    <p>Commencez par ajouter une nouvelle tâche</p>
                </div>
            `;
            return;
        }
        
        this.elements.tasksList.innerHTML = filtered.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="app.toggleTask(${task.id})"
                >
                <div class="task-content">
                    <div class="task-text">${this.escapeHtml(task.text)}</div>
                    <div class="task-meta">
                        <span class="task-category-badge">${this.getCategoryIcon(task.category)} ${this.categories[task.category]}</span>
                        <span class="task-priority-badge ${task.priority}">${this.getPriorityLabel(task.priority)}</span>
                        <span>${this.formatDate(task.createdAt)}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-edit" onclick="app.openEditModal(${task.id})">✏️ Éditer</button>
                    <button class="btn-delete" onclick="app.deleteTask(${task.id})">🗑️ Supprimer</button>
                </div>
            </div>
        `).join('');
    }

    // ===== UTILITAIRES =====
    getCategoryIcon(category) {
        const icons = {
            work: '💼',
            personal: '🏠',
            shopping: '🛒',
            health: '💪'
        };
        return icons[category] || '📝';
    }

    getPriorityLabel(priority) {
        const labels = {
            low: '🟢 Faible',
            medium: '🟡 Moyen',
            high: '🔴 Élevée'
        };
        return labels[priority];
    }

    formatDate(isoString) {
        const date = new Date(isoString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Aujourd\'hui';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Hier';
        } else {
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Implémentation simple - peut être améliorée
        console.log(`[${type.toUpperCase()}] ${message}`);
    }

    // ===== STORAGE =====
    saveToStorage() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
        } catch (e) {
            console.error('Erreur lors de la sauvegarde:', e);
            this.showNotification('Erreur de sauvegarde', 'error');
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            this.tasks = data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Erreur lors du chargement:', e);
            this.tasks = [];
        }
    }

    exportData() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todo-app-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.showNotification('Données exportées 📥', 'success');
    }
}

// ===== INITIALISATION DE L'APP =====
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
});