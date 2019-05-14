# Unichat - App

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![Version](https://img.shields.io/badge/Version-1.0-blue.svg)]()
[![Platform](https://img.shields.io/badge/React%20Native-App-green.svg)]()
[![Build Status](https://travis-ci.org/ES2-UFPI/Unichat.svg?branch=master)](https://travis-ci.org/ES2-UFPI/Unichat)

## License
Unichat is licensed under the MIT License, please see the [LICENSE](LICENSE) file.


## O que é o Unichat?
Unichat é um mensageiro que visa romper a barreira de comunicação imposta pela diferença de línguas entre pessoas de países diferentes permitindo uma troca cultural mais fácil através de tradução instântanea, ou seja, ao enviar uma mensagem numa língua X para um destinatário de outro país que têm como idioma principal Y, a mensagem será traduzida e mostrada na língua principal do destinatário.
## Qual a razão do desenvolvimento do mesmo?
Ele está sendo desenvolvido como critério de avaliação da disciplina de Engenharia de Software 2 ministrada no curso de Ciência da Computação da Universidade Federal do Piauí objetivando que os alunos aprendam a desenvolver um projeto do 0 usando de boas práticas de versionamento de código, trabalho em equipe e tendo como "cliente" avaliador o professor da disciplina.
## Tecnologias Utilizadas?
Unichat é feito em React Native uma tecnologia voltada para o desenvolvimento mobile multiplataforma de aplicativos nativos e também faz o uso do firebase tecnologia de posse da Google que oferece vários serviços para o desenvolvimento mobile, como por exemplo: Realtime Database.



# Changelog
## v0.1.0 - 22/04/2019                                                                                                                                                                                                                                                  
### New Features
 * [#33](https://github.com/ES2-UFPI/Unichat/pull/33) Autenticação com número de telefome.
  
 * [#26](https://github.com/ES2-UFPI/Unichat/pull/26) Envio de mensagens.
  
 * [#28](https://github.com/ES2-UFPI/Unichat/pull/28) Recebimento de mensagens.
  
 * [#42](https://github.com/ES2-UFPI/Unichat/pull/42) Tradução da mensagem.
 
 # Changelog
## v0.2.0 - 09/05/2019                                                                                                                                                                                                                                                  
### New Features
* [#63](https://github.com/ES2-UFPI/Unichat/pull/63) Configuração do Travis CI para integração contínua no projeto

* [#65](https://github.com/ES2-UFPI/Unichat/pull/65) Criada a tela de contatos

* [#74](https://github.com/ES2-UFPI/Unichat/pull/74) Criada tela de cadastro de um perfil

* [#75](https://github.com/ES2-UFPI/Unichat/pull/75) Criada tela de conversas

* [#70](https://github.com/ES2-UFPI/Unichat/pull/70) Criada a navegação entre telas principais por meio de uma TabBar

* [#77](https://github.com/ES2-UFPI/Unichat/pull/77) Listagem de contatos baseada nos contatos do celular com os cadastrados no Firebase

* [#78](https://github.com/ES2-UFPI/Unichat/pull/78) Configurado ImagePicker para pegar ou tirar uma foto para o perfil do usuário

* [#88](https://github.com/ES2-UFPI/Unichat/pull/88) Criação de conversa entre usuários

* [#91](https://github.com/ES2-UFPI/Unichat/pull/91) Deletar conversas

### Bug Fixes
* [#60](https://github.com/ES2-UFPI/Unichat/pull/60) Envio de mensagem vazia
* [#62](https://github.com/ES2-UFPI/Unichat/pull/62) Corrigido bug no render do Auth
* [#73](https://github.com/ES2-UFPI/Unichat/pull/73) Max sha-1 do botão
* [#82](https://github.com/ES2-UFPI/Unichat/pull/82) Correção durante a navegação entre telas
* [#89](https://github.com/ES2-UFPI/Unichat/pull/89) Correção da foto que não aparecia e o TextInput sobrescrevendo componentes
* [#90](https://github.com/ES2-UFPI/Unichat/pull/90) TextInput enviando header para fora da tela.
* [#77](https://github.com/ES2-UFPI/Unichat/pull/77)
    Corrigido bug no TextInput ([1e666ef](https://github.com/ES2-UFPI/Unichat/pull/77/commits/1e666ef300779a3d8fc93cfb7727a2f49b3c8179))
    Corrigido bug de permissões do aplicativo ([b08450b](https://github.com/ES2-UFPI/Unichat/pull/77/commits/b08450b43587d670c1b8060afe8bfa253adcea3e))
    Corrigido travis ([74fb44d](https://github.com/ES2-UFPI/Unichat/pull/77/commits/74fb44d6141c1e1a6dbdb36e0f0e5cc0f725b71b))
    Corrigido travis ([a373ad1](https://github.com/ES2-UFPI/Unichat/pull/77/commits/a373ad1103c6f982d6d931322ab9d935857c2fa2))
    Resolução de conflitos ([5868c83](https://github.com/ES2-UFPI/Unichat/pull/77/commits/5868c83d72a7cdb4b7faf1ae33d895214fc759a8))
* [#88](https://github.com/ES2-UFPI/Unichat/pull/88)
    Corrigido bug no timestamp ([9a8d2a5](https://github.com/ES2-UFPI/Unichat/pull/88/commits/9a8d2a5985acb51b02fc59410edb959be68e417e))
    Corrigido warning doc.set null ([439aa52](https://github.com/ES2-UFPI/Unichat/pull/88/commits/439aa52ce284f2f6e970c7fbffc497b067456e0f))
    Corrigido bug que não mostrava conversa quando recebia mensagem ([f2d68d3](https://github.com/ES2-UFPI/Unichat/pull/88/commits/f2d68d378f9a967e75f349186cf4ce3b0c7b2e06))
    Corrigido listener referente as conversas ([fc9494a](https://github.com/ES2-UFPI/Unichat/pull/88/commits/fc9494a17a81bf356560c8bbfc73aef963411744))

### Refatorações
* [#64](https://github.com/ES2-UFPI/Unichat/pull/64) Refatoração das telas de Auth e Verification para serem responsivas
* [#87](https://github.com/ES2-UFPI/Unichat/pull/87) Refatoração da tela de Contacts para se adequar ao design das outras telas
