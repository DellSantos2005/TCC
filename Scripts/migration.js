// // ========================================
// // SCRIPT DE MIGRAÇÃO
// // migration.js - Atualiza estrutura dos usuários
// // ========================================

// const migrarUsuarios = () => {
//   console.log('🔄 Iniciando migração de usuários...');
  
//   let migrados = 0;
//   let erros = 0;
  
//   for (let i = 0; i < localStorage.length; i++) {
//     const chave = localStorage.key(i);
    
//     if (chave.startsWith('usuario_')) {
//       try {
//         const usuario = JSON.parse(localStorage.getItem(chave));
        
//         console.log(`\n📌 Verificando usuário: ${usuario.usuario} (${usuario.curso})`);
        
//         // Verificar se o 2º ano precisa ser corrigido
//         if (!usuario.progresso["2ano"] || !usuario.progresso["2ano"].disciplinas || Object.keys(usuario.progresso["2ano"].disciplinas).length === 0) {
          
//           console.log(`  🔧 Adicionando disciplinas do 2º ano para ${usuario.usuario}...`);
          
//           // Criar estrutura do 2º ano baseada no curso
//           if (usuario.curso === "Informática") {
//             usuario.progresso["2ano"] = {
//               liberado: usuario.progresso["2ano"]?.liberado || false,
//               disciplinas: {
//                 "banco-de-dados-1": {
//                   liberado: true,
//                   concluido: false,
//                   assuntos: {
//                     "conceitos-banco-dados": { concluido: false, xp: 0 },
//                     "modelo-relacional": { concluido: false, xp: 0 },
//                     "linguagem-sql": { concluido: false, xp: 0 },
//                     "normalizacao": { concluido: false, xp: 0 }
//                   }
//                 },
//                 "linguagem-programacao-1": {
//                   liberado: false,
//                   concluido: false,
//                   assuntos: {
//                     "sintaxe-variaveis": { concluido: false, xp: 0 },
//                     "decisao": { concluido: false, xp: 0 },
//                     "repeticao": { concluido: false, xp: 0 },
//                     "vetores-matrizes": { concluido: false, xp: 0 }
//                   }
//                 }
//               }
//             };
//           } else if (usuario.curso === "Eletrotécnica") {
//             usuario.progresso["2ano"] = {
//               liberado: usuario.progresso["2ano"]?.liberado || false,
//               disciplinas: {
//                 "instalacoes-eletricas-1": {
//                   liberado: true,
//                   concluido: false,
//                   assuntos: {
//                     "circuitos-iluminacao": { concluido: false, xp: 0 },
//                     "Tomadas-Disjuntores": { concluido: false, xp: 0 },
//                     "Calculo-Carga": { concluido: false, xp: 0 },
//                     "Dimensionamento-Cabos": { concluido: false, xp: 0 }
//                   }
//                 },
//                 "maquinas-eletricas": {
//                   liberado: false,
//                   concluido: false,
//                   assuntos: {
//                     "motores-eletricos": { concluido: false, xp: 0 },
//                     "Transformadores": { concluido: false, xp: 0 },
//                     "Equipamentos-Protecao": { concluido: false, xp: 0 },
//                     "instalacoes-industriais": { concluido: false, xp: 0 }
//                   }
//                 }
//               }
//             };
//           }
          
//           // Salvar usuário atualizado
//           localStorage.setItem(chave, JSON.stringify(usuario));
//           migrados++;
          
//           console.log(`  ✅ Migrado com sucesso!`);
//           console.log(`  📚 Disciplinas adicionadas:`, Object.keys(usuario.progresso["2ano"].disciplinas));
//         } else {
//           console.log(`  ✓ Usuário já possui estrutura correta`);
//         }
        
//       } catch (erro) {
//         console.error(`  ❌ Erro ao migrar usuário ${chave}:`, erro);
//         erros++;
//       }
//     }
//   }
  
//   console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
//   console.log('📊 RESULTADO DA MIGRAÇÃO:');
//   console.log(`✅ Migrados: ${migrados}`);
//   console.log(`❌ Erros: ${erros}`);
//   console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
//   if (migrados > 0) {
//     alert(`✅ Migração concluída!\n\n${migrados} usuário(s) atualizado(s).\n\nRecarregue a página para aplicar as mudanças.`);
//     return true;
//   } else {
//     alert('ℹ️ Todos os usuários já possuem a estrutura atualizada.');
//     return false;
//   }
// };

// // Executar migração automaticamente
// console.log('🚀 Verificando necessidade de migração...');
// migrarUsuarios();

// // Expor função para migração manual
// window.migrarUsuarios = migrarUsuarios;