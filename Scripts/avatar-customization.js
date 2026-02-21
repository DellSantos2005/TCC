// ========================================
// SISTEMA DE AVATAR COM AVATAAARS COMPLETO
// avatar-avataaars-complete.js
// ========================================

// ========================================
// TODAS AS OPÇÕES AVATAAARS
// ========================================

const avataaarsOptions = {
    // Tons de pele
    skin: [
        { id: 'Tanned', name: 'Bronzeado', color: '#FD9841' },
        { id: 'Yellow', name: 'Amarelo', color: '#F8D25C' },
        { id: 'Pale', name: 'Pálido', color: '#FFDBB4' },
        { id: 'Light', name: 'Claro', color: '#EDB98A' },
        { id: 'Brown', name: 'Moreno', color: '#D08B5B' },
        { id: 'DarkBrown', name: 'Moreno Escuro', color: '#AE5D29' },
        { id: 'Black', name: 'Negro', color: '#614335' }
    ],
    
    // Estilos de cabelo (TOP)
    top: [
        { id: 'NoHair', name: '🧑‍🦲 Sem Cabelo' },
        { id: 'ShortHairShortFlat', name: '✂️ Curto Liso' },
        { id: 'ShortHairShortRound', name: '✂️ Curto Redondo' },
        { id: 'ShortHairShortWaved', name: '🌊 Curto Ondulado' },
        { id: 'ShortHairDreads01', name: '🎨 Dreads Curto' },
        { id: 'ShortHairFrizzle', name: '😊 Curto Frisado' },
        { id: 'ShortHairShaggyMullet', name: '🎸 Mullet' },
        { id: 'ShortHairTheCaesar', name: '🏛️ Caesar' },
        { id: 'LongHairBigHair', name: '💇 Grande' },
        { id: 'LongHairBob', name: '💇 Bob' },
        { id: 'LongHairBun', name: '🎀 Coque' },
        { id: 'LongHairCurly', name: '🌀 Cacheado Longo' },
        { id: 'LongHairCurvy', name: '〰️ Ondulado Longo' },
        { id: 'LongHairDreads', name: '🎨 Dreads Longo' },
        { id: 'LongHairStraight', name: '📏 Liso Longo' },
        { id: 'LongHairStraight2', name: '📏 Liso Longo 2' },
        { id: 'Turban', name: '🎩 Turbante' },
        { id: 'Hijab', name: '🧕 Hijab' },
        { id: 'Hat', name: '🎩 Chapéu' }
    ],
    
    // Cores de cabelo
    hairColor: [
        { id: 'Auburn', name: 'Castanho Avermelhado', color: '#A55728' },
        { id: 'Black', name: 'Preto', color: '#2C1B18' },
        { id: 'Blonde', name: 'Loiro', color: '#B58143' },
        { id: 'BlondeGolden', name: 'Loiro Dourado', color: '#D6B370' },
        { id: 'Brown', name: 'Castanho', color: '#724133' },
        { id: 'BrownDark', name: 'Castanho Escuro', color: '#4A312C' },
        { id: 'PastelPink', name: 'Rosa Pastel', color: '#F59797' },
        { id: 'Platinum', name: 'Platinado', color: '#ECDCBF' },
        { id: 'Red', name: 'Ruivo', color: '#C93305' },
        { id: 'SilverGray', name: 'Grisalho', color: '#E8E1E1' }
    ],
    
    // Acessórios (chapéus, etc)
    accessories: [
        { id: 'Blank', name: '❌ Nenhum' },
        { id: 'Kurt', name: '🎧 Kurt' },
        { id: 'Prescription01', name: '👓 Óculos Redondo' },
        { id: 'Prescription02', name: '👓 Óculos Quadrado' },
        { id: 'Round', name: '🕶️ Redondo' },
        { id: 'Sunglasses', name: '😎 Óculos Escuros' },
        { id: 'Wayfarers', name: '😎 Wayfarers' }
    ],
    
    // Pelos faciais
    facialHair: [
        { id: 'Blank', name: '❌ Nenhum' },
        { id: 'BeardMedium', name: '🧔 Barba Média' },
        { id: 'BeardLight', name: '🧔 Barba Leve' },
        { id: 'BeardMagestic', name: '🧔 Barba Majestosa' },
        { id: 'MoustacheFancy', name: '🥸 Bigode Chique' },
        { id: 'MoustacheMagnum', name: '🥸 Bigode Magnum' }
    ],
    
    // Cores de pelos faciais
    facialHairColor: [
        { id: 'Auburn', name: 'Castanho Avermelhado', color: '#A55728' },
        { id: 'Black', name: 'Preto', color: '#2C1B18' },
        { id: 'Blonde', name: 'Loiro', color: '#B58143' },
        { id: 'BlondeGolden', name: 'Loiro Dourado', color: '#D6B370' },
        { id: 'Brown', name: 'Castanho', color: '#724133' },
        { id: 'BrownDark', name: 'Castanho Escuro', color: '#4A312C' },
        { id: 'Platinum', name: 'Platinado', color: '#ECDCBF' },
        { id: 'Red', name: 'Ruivo', color: '#C93305' }
    ],
    
    // Roupas
    clothes: [
        { id: 'BlazerShirt', name: '👔 Blazer', icon: '💼' },
        { id: 'BlazerSweater', name: '🧥 Blazer Suéter', icon: '🧥' },
        { id: 'CollarSweater', name: '👕 Suéter Gola', icon: '👕' },
        { id: 'Hoodie', name: '🧥 Moletom', icon: '🧥' },
        { id: 'Overall', name: '👖 Jardineira', icon: '👖' },
        { id: 'ShirtCrewNeck', name: '👕 Camiseta', icon: '👕' },
        { id: 'ShirtScoopNeck', name: '👕 Regata', icon: '👕' },
        { id: 'ShirtVNeck', name: '👕 Gola V', icon: '👕' }
    ],
    
    // Cores de roupa
    clothesColor: [
        { id: 'Black', name: 'Preto', color: '#262E33' },
        { id: 'Blue01', name: 'Azul Escuro', color: '#65C9FF' },
        { id: 'Blue02', name: 'Azul Médio', color: '#5199E4' },
        { id: 'Blue03', name: 'Azul Claro', color: '#25557C' },
        { id: 'Gray01', name: 'Cinza Claro', color: '#E6E6E6' },
        { id: 'Gray02', name: 'Cinza', color: '#929598' },
        { id: 'Heather', name: 'Mescla', color: '#3C4F5C' },
        { id: 'PastelBlue', name: 'Azul Pastel', color: '#B1E2FF' },
        { id: 'PastelGreen', name: 'Verde Pastel', color: '#A7FFC4' },
        { id: 'PastelOrange', name: 'Laranja Pastel', color: '#FFDEB5' },
        { id: 'PastelRed', name: 'Vermelho Pastel', color: '#FFAFB9' },
        { id: 'PastelYellow', name: 'Amarelo Pastel', color: '#FFFFB1' },
        { id: 'Pink', name: 'Rosa', color: '#FF488E' },
        { id: 'Red', name: 'Vermelho', color: '#FF5C5C' },
        { id: 'White', name: 'Branco', color: '#FFFFFF' }
    ],
    
    // Olhos
    eyes: [
        { id: 'Close', name: '😌 Fechados' },
        { id: 'Cry', name: '😢 Chorando' },
        { id: 'Default', name: '😊 Padrão' },
        { id: 'Dizzy', name: '😵 Tontos' },
        { id: 'EyeRoll', name: '🙄 Revirando' },
        { id: 'Happy', name: '😄 Feliz' },
        { id: 'Hearts', name: '😍 Corações' },
        { id: 'Side', name: '👀 Lado' },
        { id: 'Squint', name: '😆 Semicerrados' },
        { id: 'Surprised', name: '😲 Surpreso' },
        { id: 'Wink', name: '😉 Piscando' },
        { id: 'WinkWacky', name: '🤪 Piscada Maluca' }
    ],
    
    // Sobrancelhas
    eyebrow: [
        { id: 'Angry', name: '😠 Bravo' },
        { id: 'AngryNatural', name: '😠 Bravo Natural' },
        { id: 'Default', name: '😊 Padrão' },
        { id: 'DefaultNatural', name: '😊 Padrão Natural' },
        { id: 'FlatNatural', name: '😐 Retas' },
        { id: 'RaisedExcited', name: '🤩 Animado' },
        { id: 'RaisedExcitedNatural', name: '🤩 Animado Natural' },
        { id: 'SadConcerned', name: '😟 Preocupado' },
        { id: 'SadConcernedNatural', name: '😟 Preocupado Natural' },
        { id: 'UnibrowNatural', name: '😐 Monocelha' },
        { id: 'UpDown', name: '🤨 Desigual' },
        { id: 'UpDownNatural', name: '🤨 Desigual Natural' }
    ],
    
    // Boca
    mouth: [
        { id: 'Concerned', name: '😟 Preocupado' },
        { id: 'Default', name: '😊 Padrão' },
        { id: 'Disbelief', name: '😐 Descrença' },
        { id: 'Eating', name: '😋 Comendo' },
        { id: 'Grimace', name: '😬 Careta' },
        { id: 'Sad', name: '😢 Triste' },
        { id: 'ScreamOpen', name: '😱 Gritando' },
        { id: 'Serious', name: '😐 Sério' },
        { id: 'Smile', name: '🙂 Sorriso' },
        { id: 'Tongue', name: '😛 Língua' },
        { id: 'Twinkle', name: '✨ Brilho' },
        { id: 'Vomit', name: '🤢 Náusea' }
    ]
};

// ========================================
// GERAR URL DO AVATAR
// ========================================

const gerarURLAvataaars = (config) => {
    const baseURL = 'https://avataaars.io/';
    const params = new URLSearchParams({
        avatarStyle: 'Transparent',
        topType: config.top || 'ShortHairShortFlat',
        accessoriesType: config.accessories || 'Blank',
        hairColor: config.hairColor || 'Black',
        facialHairType: config.facialHair || 'Blank',
        facialHairColor: config.facialHairColor || 'Black',
        clotheType: config.clothes || 'ShirtCrewNeck',
        clotheColor: config.clothesColor || 'Blue03',
        eyeType: config.eyes || 'Default',
        eyebrowType: config.eyebrow || 'Default',
        mouthType: config.mouth || 'Smile',
        skinColor: config.skin || 'Light'
    });
    
    return `${baseURL}?${params.toString()}`;
};

// ========================================
// CRIAR AVATAR PADRÃO
// ========================================

const criarAvatarPadrao = (usuario) => {
    const isInformatica = usuario.curso === "Informática";
    
    return {
        skin: 'Light',
        top: isInformatica ? 'ShortHairShortFlat' : 'ShortHairShortWaved',
        hairColor: 'Black',
        accessories: 'Prescription02',
        facialHair: 'Blank',
        facialHairColor: 'Black',
        clothes: isInformatica ? 'Hoodie' : 'ShirtCrewNeck',
        clothesColor: isInformatica ? 'Blue03' : 'PastelOrange',
        eyes: 'Happy',
        eyebrow: 'Default',
        mouth: 'Smile',
        customizado: false
    };
};

// ========================================
// CARREGAR AVATAR
// ========================================

const carregarAvatar = () => {
    const usuario = obterUsuarioLogado();
    if (!usuario) {
        console.error('❌ Usuário não logado');
        return null;
    }
    
    if (!usuario.avatar) {
        console.log('📝 Criando avatar padrão...');
        usuario.avatar = criarAvatarPadrao(usuario);
        atualizarUsuarioLogado(usuario);
    }
    
    return usuario.avatar;
};

// ========================================
// SALVAR AVATAR
// ========================================

const salvarAvatar = (avatarConfig) => {
    const usuario = obterUsuarioLogado();
    if (!usuario) {
        console.error('❌ Usuário não encontrado');
        return false;
    }
    
    console.log('💾 Salvando avatar:', avatarConfig);
    
    usuario.avatar = {
        ...avatarConfig,
        customizado: true
    };
    
    return atualizarUsuarioLogado(usuario);
};

// ========================================
// RENDERIZAR AVATAR
// ========================================

const renderizarAvatar = (container, tamanho = 200) => {
    if (!container) {
        console.error('❌ Container não encontrado');
        return;
    }
    
    const avatarConfig = carregarAvatar();
    if (!avatarConfig) {
        console.error('❌ Config do avatar não encontrada');
        return;
    }
    
    console.log('🎨 Renderizando avatar:', avatarConfig);
    
    const url = gerarURLAvataaars(avatarConfig);
    
    container.innerHTML = `
        <img 
            src="${url}" 
            alt="Avatar do usuário" 
            class="avatar-img"
            style="
                width: ${tamanho}px;
                height: ${tamanho}px;
                border-radius: 50%;
                border: 4px solid #1e88e5;
                box-shadow: 0 4px 15px rgba(30, 136, 229, 0.4);
                background: transparent;
                object-fit: cover;
            "
        />
    `;
};

// ========================================
// ABRIR EDITOR DE AVATAR
// ========================================

const abrirEditorAvatar = () => {
    console.log('🎨 Abrindo editor de avatar...');
    
    const usuario = obterUsuarioLogado();
    if (!usuario) {
        alert('❌ Erro: Usuário não encontrado');
        return;
    }
    
    const currentAvatar = carregarAvatar();
    let tempAvatar = { ...currentAvatar };
    
    // Criar modal
    const modal = document.createElement('div');
    modal.id = 'avatar-editor-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1a1a27 0%, #2a2a3a 100%);
            border-radius: 20px;
            padding: 40px;
            max-width: 1200px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
            border: 2px solid #1e88e5;
        ">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <div>
                    <h2 style="color: #1e88e5; font-size: 2.2rem; margin: 0;">🎨 Crie seu Avatar Único!</h2>
                    <p style="color: #999; margin-top: 5px;">Personalize cada detalhe do seu personagem</p>
                </div>
                <button id="close-editor" style="
                    background: #e53935;
                    border: none;
                    color: white;
                    font-size: 1.8rem;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(229, 57, 53, 0.4);
                ">✕</button>
            </div>
            
            <!-- Grid Principal -->
            <div style="display: grid; grid-template-columns: 300px 1fr; gap: 30px; margin-bottom: 30px;">
                
                <!-- Preview Fixo -->
                <div style="
                    background: #2c2c42;
                    border-radius: 20px;
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    border: 2px solid #1e88e5;
                    position: sticky;
                    top: 20px;
                    height: fit-content;
                ">
                    <h3 style="color: #1e88e5; margin: 0; font-size: 1.4rem;">Preview</h3>
                    <div id="avatar-preview-large" style="
                        width: 250px;
                        height: 250px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 50%;
                        padding: 10px;
                    "></div>
                    <div style="text-align: center; color: #999; font-size: 0.9rem;">
                        <p style="margin: 5px 0;">
                            <strong style="color: #1e88e5;">${usuario.curso}</strong>
                            ${usuario.curso === 'Informática' ? '💻' : '⚡'}
                        </p>
                    </div>
                </div>
                
                <!-- Opções de Customização -->
                <div style="
                    background: #2c2c42;
                    border-radius: 20px;
                    padding: 30px;
                    border: 2px solid #1e88e5;
                    overflow-y: auto;
                    max-height: 600px;
                ">
                    <div id="customization-options"></div>
                </div>
            </div>
            
            <!-- Botões de Ação -->
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button id="randomize-avatar" style="
                    background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
                    border: none;
                    color: white;
                    padding: 15px 30px;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 1.1rem;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(156, 39, 176, 0.4);
                ">🎲 Avatar Aleatório</button>
                
                <button id="save-avatar" style="
                    background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
                    border: none;
                    color: white;
                    padding: 15px 40px;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 1.2rem;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
                ">💾 Salvar Avatar</button>
                
                <button id="cancel-avatar" style="
                    background: #757575;
                    border: none;
                    color: white;
                    padding: 15px 30px;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 1.1rem;
                    font-weight: bold;
                    transition: all 0.3s ease;
                ">❌ Cancelar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Função de atualizar preview
    const updatePreview = () => {
        const previewContainer = document.getElementById('avatar-preview-large');
        const url = gerarURLAvataaars(tempAvatar);
        previewContainer.innerHTML = `
            <img src="${url}" alt="Preview" style="
                width: 240px;
                height: 240px;
                border-radius: 50%;
                background: white;
                border: 4px solid white;
            "/>
        `;
    };
    
    // Função de renderizar opções
    const renderOptions = () => {
        const container = document.getElementById('customization-options');
        
        let html = '';
        
        // Função auxiliar para criar seção
        const createSection = (title, emoji, options, currentValue, property) => {
            let sectionHTML = `
                <div style="margin-bottom: 30px;">
                    <h4 style="
                        color: #1e88e5; 
                        margin-bottom: 15px; 
                        font-size: 1.2rem;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">${emoji} ${title}</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 10px;">
            `;
            
            options.forEach(option => {
                const isSelected = currentValue === option.id;
                const previewUrl = gerarURLAvataaars({ ...tempAvatar, [property]: option.id });
                
                sectionHTML += `
                    <button class="option-btn" data-property="${property}" data-value="${option.id}" style="
                        padding: 8px;
                        background: ${isSelected ? '#1e88e5' : '#1a1a27'};
                        border: 2px solid ${isSelected ? '#1e88e5' : '#666'};
                        border-radius: 10px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 5px;
                    ">
                        <img src="${previewUrl}" style="
                            width: 60px; 
                            height: 60px; 
                            border-radius: 50%;
                            background: white;
                        "/>
                        <span style="
                            font-size: 0.7rem; 
                            color: ${isSelected ? 'white' : '#999'};
                            text-align: center;
                            font-weight: ${isSelected ? 'bold' : 'normal'};
                        ">${option.name.replace(/[😊😢😄😵🙄😍👀😆😲😉🤪😠😐🤩😟🤨😟🙂😬😢😱😐🙂😛✨🤢❌🎧👓🕶️😎🧔🥸💼🧥👕👖]/g, '')}</span>
                    </button>
                `;
            });
            
            sectionHTML += `
                    </div>
                </div>
            `;
            
            return sectionHTML;
        };
        
        // Renderizar todas as seções
        html += createSection('Tom de Pele', '🎨', avataaarsOptions.skin, tempAvatar.skin, 'skin');
        html += createSection('Cabelo', '💇', avataaarsOptions.top, tempAvatar.top, 'top');
        html += createSection('Cor do Cabelo', '🎨', avataaarsOptions.hairColor, tempAvatar.hairColor, 'hairColor');
        html += createSection('Acessórios', '👓', avataaarsOptions.accessories, tempAvatar.accessories, 'accessories');
        html += createSection('Barba/Bigode', '🧔', avataaarsOptions.facialHair, tempAvatar.facialHair, 'facialHair');
        
        if (tempAvatar.facialHair !== 'Blank') {
            html += createSection('Cor da Barba', '🎨', avataaarsOptions.facialHairColor, tempAvatar.facialHairColor, 'facialHairColor');
        }
        
        html += createSection('Roupa', '👕', avataaarsOptions.clothes, tempAvatar.clothes, 'clothes');
        html += createSection('Cor da Roupa', '🎨', avataaarsOptions.clothesColor, tempAvatar.clothesColor, 'clothesColor');
        html += createSection('Olhos', '👁️', avataaarsOptions.eyes, tempAvatar.eyes, 'eyes');
        html += createSection('Sobrancelhas', '🤨', avataaarsOptions.eyebrow, tempAvatar.eyebrow, 'eyebrow');
        html += createSection('Boca', '👄', avataaarsOptions.mouth, tempAvatar.mouth, 'mouth');
        
        container.innerHTML = html;
        
        // Event listeners
        container.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const property = this.dataset.property;
                const value = this.dataset.value;
                tempAvatar[property] = value;
                updatePreview();
                renderOptions();
            });
            
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    };
    
    // Event listeners principais
    document.getElementById('close-editor').addEventListener('click', () => {
        modal.remove();
    });
    
    document.getElementById('cancel-avatar').addEventListener('click', () => {
        modal.remove();
    });
    
    document.getElementById('save-avatar').addEventListener('click', () => {
        console.log('💾 Salvando avatar...');
        if (salvarAvatar(tempAvatar)) {
            alert('✅ Avatar salvo com sucesso!');
            atualizarAvatarPerfil();
            modal.remove();
        } else {
            alert('❌ Erro ao salvar avatar.');
        }
    });
    
    document.getElementById('randomize-avatar').addEventListener('click', () => {
        tempAvatar = {
            skin: avataaarsOptions.skin[Math.floor(Math.random() * avataaarsOptions.skin.length)].id,
            top: avataaarsOptions.top[Math.floor(Math.random() * avataaarsOptions.top.length)].id,
            hairColor: avataaarsOptions.hairColor[Math.floor(Math.random() * avataaarsOptions.hairColor.length)].id,
            accessories: avataaarsOptions.accessories[Math.floor(Math.random() * avataaarsOptions.accessories.length)].id,
            facialHair: avataaarsOptions.facialHair[Math.floor(Math.random() * avataaarsOptions.facialHair.length)].id,
            facialHairColor: avataaarsOptions.facialHairColor[Math.floor(Math.random() * avataaarsOptions.facialHairColor.length)].id,
            clothes: avataaarsOptions.clothes[Math.floor(Math.random() * avataaarsOptions.clothes.length)].id,
            clothesColor: avataaarsOptions.clothesColor[Math.floor(Math.random() * avataaarsOptions.clothesColor.length)].id,
            eyes: avataaarsOptions.eyes[Math.floor(Math.random() * avataaarsOptions.eyes.length)].id,
            eyebrow: avataaarsOptions.eyebrow[Math.floor(Math.random() * avataaarsOptions.eyebrow.length)].id,
            mouth: avataaarsOptions.mouth[Math.floor(Math.random() * avataaarsOptions.mouth.length)].id
        };
        
        updatePreview();
        renderOptions();
    });
    
    // Hover effects
    modal.querySelectorAll('#close-editor, #save-avatar, #cancel-avatar, #randomize-avatar').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.filter = 'brightness(1.1)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Inicializar
    updatePreview();
    renderOptions();
};

// ========================================
// ATUALIZAR AVATAR NO PERFIL
// ========================================

const atualizarAvatarPerfil = () => {
    console.log('🔄 Atualizando avatar no perfil...');
    
    let avatarContainer = document.querySelector('.avatar');
    
    if (!avatarContainer) {
        const container = document.querySelector('.avatar-container');
        if (container) {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'avatar';
            avatarDiv.style.cssText = 'display: flex; justify-content: center; align-items: center;';
            
            const editBtn = container.querySelector('.avatar-editor');
            if (editBtn) {
                container.insertBefore(avatarDiv, editBtn);
            } else {
                container.appendChild(avatarDiv);
            }
            
            avatarContainer = avatarDiv;
        }
    }
    
    if (avatarContainer) {
        renderizarAvatar(avatarContainer, 200);
        console.log('✅ Avatar atualizado no perfil');
    } else {
        console.error('❌ Container do avatar não encontrado');
    }
};

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.pathname;
    
    console.log('📄 Página carregada:', url);
    
    if (url.includes('Perfil.html')) {
        console.log('✅ Página de perfil detectada');
        
        const btnEditor = document.querySelector('.avatar-editor button');
        if (btnEditor) {
            console.log('✅ Botão de edição encontrado');
            btnEditor.addEventListener('click', (e) => {
                e.preventDefault();
                abrirEditorAvatar();
            });
        } else {
            console.warn('⚠️ Botão de edição não encontrado');
        }
        
        setTimeout(() => {
            console.log('🎨 Renderizando avatar inicial...');
            atualizarAvatarPerfil();
        }, 500);
    }
});

window.abrirEditorAvatar = abrirEditorAvatar;
window.atualizarAvatarPerfil = atualizarAvatarPerfil;