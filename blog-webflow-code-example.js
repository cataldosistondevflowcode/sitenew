/**
 * Exemplo de código para buscar posts do blog do Webflow CMS
 * Collection ID: 692c64760de964487f419b16
 */

// Configuração do Webflow (usando variáveis do .env via Vite)
const WEBFLOW_BLOG_COLLECTION_ID = '692c64760de964487f419b16';

// Função para buscar posts do blog do Webflow
async function fetchBlogPosts() {
    try {
        // Em desenvolvimento, usa o proxy do Vite
        // Em produção, precisa de um backend proxy ou usar API diretamente com CORS
        const apiUrl = import.meta.env.DEV 
            ? '/api/webflow' 
            : 'https://api.webflow.com/v2';
        
        const token = import.meta.env.VITE_WEBFLOW_API_TOKEN;
        const siteId = import.meta.env.VITE_WEBFLOW_SITE_ID;
        
        const endpoint = `${apiUrl}/collections/${WEBFLOW_BLOG_COLLECTION_ID}/items`;
        
        const headers = {
            'accept-version': '1.0.0',
            'Content-Type': 'application/json',
        };
        
        // Em produção, adiciona o token
        if (!import.meta.env.DEV && token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: headers
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('❌ Erro ao buscar posts do blog:', error);
        return [];
    }
}

// Função para buscar um post específico por slug
async function fetchBlogPostBySlug(slug) {
    try {
        const posts = await fetchBlogPosts();
        return posts.find(post => post.fieldData.slug === slug) || null;
    } catch (error) {
        console.error('❌ Erro ao buscar post por slug:', error);
        return null;
    }
}

// Exemplo de uso para popular blog.html (lista de posts)
async function populateBlogList() {
    const posts = await fetchBlogPosts();
    const container = document.getElementById('blog-posts-container');
    
    if (!container) return;
    
    container.innerHTML = posts.map(post => {
        const title = post.fieldData.name || 'Sem título';
        const slug = post.fieldData.slug || post.id;
        const excerpt = post.fieldData.excerpt || '';
        const featuredImage = post.fieldData['featured-image']?.url || '';
        const publishedDate = post.fieldData['published-date'] || post.lastPublished;
        const category = post.fieldData.category || '';
        
        return `
            <article class="blog-post-card">
                <a href="blogpost.html?slug=${slug}">
                    <img src="${featuredImage}" alt="${title}">
                    <h3>${title}</h3>
                    <p>${excerpt}</p>
                    <span>${formatDate(publishedDate)}</span>
                    ${category ? `<span class="category">${category}</span>` : ''}
                </a>
            </article>
        `;
    }).join('');
}

// Exemplo de uso para popular blogpost.html (post individual)
async function populateBlogPost(slug) {
    const post = await fetchBlogPostBySlug(slug);
    
    if (!post) {
        console.error('Post não encontrado');
        return;
    }
    
    // Popular campos do post
    document.getElementById('post-title').textContent = post.fieldData.name || '';
    document.getElementById('post-content').innerHTML = post.fieldData.content || '';
    document.getElementById('post-date').textContent = formatDate(post.fieldData['published-date'] || post.lastPublished);
    document.getElementById('post-author-name').textContent = post.fieldData['author-name'] || '';
    document.getElementById('post-author-role').textContent = post.fieldData['author-role'] || '';
    
    if (post.fieldData['author-image']?.url) {
        document.getElementById('post-author-image').src = post.fieldData['author-image'].url;
    }
    
    if (post.fieldData['featured-image']?.url) {
        document.getElementById('post-featured-image').src = post.fieldData['featured-image'].url;
    }
}

// Helper para formatar data
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

