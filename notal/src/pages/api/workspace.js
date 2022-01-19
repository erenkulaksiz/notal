const admin = require("firebase-admin");
const { firebaseConfig } = require('../../config/firebaseApp.config');

const googleService = JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_SERVICE);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(googleService),
        databaseURL: firebaseConfig.databaseURL
    });
}

export default async function handler(req, res) {

    const { uid, title, desc, action, starred, id, workspaceId, color, fieldId, filterBy, swapType, cardId, toFieldId, toCardId } = JSON.parse(req.body);

    const workspaceAction = {
        create: async () => {
            if (!uid || !action) {
                res.status(400).send({ success: false, error: "invalid-params" })
                return;
            }

            const ref = await admin.database().ref(`/workspaces`).push();
            await ref.set({
                title, desc, starred, createdAt: Date.now(), updatedAt: Date.now(), owner: uid
            });
            res.status(200).send({ success: true });
        },
        get_workspaces: async () => {
            const { uid } = JSON.parse(req.body);

            if (!uid) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            await admin.database().ref(`/workspaces`).orderByChild("owner").equalTo(uid).once("value", async (snapshot) => {
                if (snapshot.exists()) {
                    res.status(200).send({ success: true, data: snapshot.val() });
                } else {
                    res.status(200).send({ success: true });
                }
            });
        },
        get_workspace: async () => {
            if (!id) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            await admin.database().ref(`/workspaces/${id}`).once("value", async (snapshot) => {
                if (snapshot.exists()) {
                    const workspace = snapshot.val();

                    await admin.database().ref(`/users/${workspace.owner}`).once("value", async (snapshot) => {
                        if (snapshot.exists()) {
                            res.status(200).send({ success: true, data: { ...workspace, profile: snapshot.val() } });
                        } else {
                            res.status(400).send({ success: false });
                        }
                    }).catch(error => {
                        res.status(400).send({ success: false, error });
                    });
                } else {
                    res.status(400).send({ success: false });
                }
            }).catch(error => {
                res.status(400).send({ success: false, error });
            });
        },
        delete: async () => {
            if (!uid) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            await admin.database().ref(`/workspaces/${id}`).once("value", async (snapshot) => {
                if (snapshot.exists()) {
                    await admin.database().ref(`/workspaces/${id}`).remove(() => {
                        res.status(200).send({ success: true });
                    }).catch(error => {
                        res.status(400).send({ success: false, error });
                    });
                } else {
                    res.status(400).send({ success: false });
                }
            });
        },
        star: async () => {
            if (!uid || !id) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            await admin.database().ref(`/workspaces`).orderByKey().equalTo(id).once("value", async (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val()[Object.keys(snapshot.val())[0]];

                    const starred = !data.starred;

                    if (data.owner == uid) {

                        await admin.database().ref(`/workspaces/${id}`).update({ starred, updatedAt: Date.now() }, () => {
                            res.status(200).send({ success: true });
                        }).catch(error => {
                            res.status(400).send({ success: false, error });
                        });
                    } else {
                        res.status(400).send({ success: false, error: "unauthorized" });
                    }
                } else {
                    res.status(400).send({ success: false });
                }
            }).catch(error => {
                res.status(400).send({ success: false, error });
            });
        },
        edit: async () => {
            if (!id || !uid) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            await admin.database().ref(`/workspaces/${id}`).once("value", async (snapshot) => {
                if (snapshot.exists()) {
                    if (snapshot.val().owner == uid) {

                        await admin.database().ref(`/workspaces/${id}`).update({ title, desc, updatedAt: Date.now() }, () => {
                            res.status(200).send({ success: true });
                        }).catch(error => {
                            res.status(400).send({ success: false, error });
                        });
                    } else {
                        res.status(400).send({ success: false, error: "unauthorized" });
                    }
                } else {
                    res.status(400).send({ success: false });
                }
            }).catch(error => {
                res.status(400).send({ success: false, error });
            });
        },
        addfield: async () => {
            if (!id || !uid || !filterBy) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            const ref = await admin.database().ref(`/workspaces/${id}/fields`).push();
            await ref.set({
                title, createdAt: Date.now(), updatedAt: Date.now(), filterBy
            }, () => {
                res.status(200).send({ success: true });
            }).catch((error) => {
                res.status(400).send({ success: false, error });
            });
        },
        removefield: async () => {
            if (!id || !uid || !workspaceId) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            console.log("Workspace id: ", workspaceId, " id of field: ", id);

            await admin.database().ref(`/workspaces/${workspaceId}/fields/${id}`).remove(() => {
                res.status(200).send({ success: true });
            }).catch((error) => {
                res.status(400).send({ success: false, error });
            });
        },
        addcard: async () => {

            // id: field id

            //console.log(color, title, desc, workspaceId, uid, id);
            if (!id || !uid || !workspaceId || !title || !desc || !color) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            // first, calculate card index.

            await admin.database().ref(`/workspaces/${workspaceId}/fields/${id}/cards`).orderByChild("index").limitToLast(1).once("value", async (snapshot) => {
                if (snapshot.exists()) {
                    const card = snapshot.val()[Object.keys(snapshot.val())];
                    const newIndex = card.index + 1;

                    const ref = await admin.database().ref(`/workspaces/${workspaceId}/fields/${id}/cards`).push();

                    await ref.set({
                        title, createdAt: Date.now(), updatedAt: Date.now(), title, desc, color, index: newIndex
                    }, () => {
                        res.status(200).send({ success: true });
                    }).catch((error) => {
                        res.status(400).send({ success: false, error });
                    });
                } else {

                    const ref = await admin.database().ref(`/workspaces/${workspaceId}/fields/${id}/cards`).push();

                    await ref.set({
                        title, createdAt: Date.now(), updatedAt: Date.now(), title, desc, color, index: 0 // set to first element of field
                    }, () => {
                        res.status(200).send({ success: true });
                    }).catch((error) => {
                        res.status(400).send({ success: false, error });
                    });
                }
            }).catch(error => {
                res.status(400).send({ success: false, error });
            });
        },
        removecard: async () => {
            if (!id || !uid || !workspaceId || !fieldId) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${id}`).remove(() => {
                res.status(200).send({ success: true });
            }).catch((error) => {
                res.status(400).send({ success: false, error });
            });
        },
        editfield: async () => {
            if (!id || !uid || !workspaceId || !title) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            await admin.database().ref(`/workspaces/${workspaceId}/fields/${id}`).update({ title, updatedAt: Date.now() }, () => {
                res.status(200).send({ success: true });
            }).catch(error => {
                res.status(400).send({ success: false, error });
            });
        },
        editcard: async () => {
            if (!id || !uid || !workspaceId || !title || !desc || !color || !fieldId) {
                res.status(400).send({ success: false, error: "invalid-params" });
                return;
            }

            await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${id}`).update({ title, desc, color, updatedAt: Date.now() }, () => {
                res.status(200).send({ success: true });
            }).catch(error => {
                res.status(400).send({ success: false, error });
            });
        },
        cardswap: async () => {
            if (!cardId || !uid || !workspaceId || !fieldId || !swapType) {
                res.status(400).send({ success: false, error: "invalid-params" });
                res.end();
                return;
            }

            console.log("Swaptype: ", swapType);

            await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${cardId}`).once("value", async (snapshot) => {
                if (snapshot.exists()) {
                    const card = snapshot.val();
                    const firstSwapIndex = card.index;

                    if (swapType == "up") {

                        await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards`).orderByChild("index").endAt(firstSwapIndex).limitToLast(2).once("value", async (snapshot) => {
                            if (snapshot.exists()) {
                                if (Object.keys(snapshot.val()).length > 1) {
                                    const swapToCard = Object.keys(snapshot.val()).map(el => { return { ...snapshot.val()[el], id: el } }).filter(el => el.id != cardId)[0];
                                    console.log("swap with card: ", swapToCard);

                                    await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${swapToCard.id}`).update({ index: firstSwapIndex }, async () => {
                                        await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${cardId}`).update({ index: swapToCard.index }, async () => {
                                            console.log("finish!");
                                            res.status(200).send({ success: true });
                                            res.end();
                                        }).catch(error => {
                                            res.status(400).send({ success: false, error });
                                            res.end();
                                        });
                                    }).catch(error => {
                                        res.status(400).send({ success: false, error });
                                        res.end();
                                    });
                                } else {
                                    console.log("adam ol en üsttekini arttırmaya çalışma");
                                    res.status(200).send({ success: true });
                                    res.end();
                                }
                            } else {
                                console.log("first swap bulamadım");
                                res.status(200).send({ success: true });
                                res.end();
                            }
                        });
                    } else if (swapType == "down") {
                        await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards`).orderByChild("index").startAt(firstSwapIndex).limitToFirst(2).once("value", async (snapshot) => {
                            if (snapshot.exists()) {
                                if (Object.keys(snapshot.val()).length > 1) {
                                    const swapToCard = Object.keys(snapshot.val()).map(el => { return { ...snapshot.val()[el], id: el } }).filter(el => el.id != cardId)[0];
                                    console.log("swap with card: ", swapToCard);
                                    await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${swapToCard.id}`).update({ index: firstSwapIndex }, async () => {
                                        await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${cardId}`).update({ index: swapToCard.index }, async () => {
                                            console.log("finish!");
                                            res.status(200).send({ success: true });
                                            res.end();
                                        }).catch(error => {
                                            res.status(400).send({ success: false, error });
                                            res.end();
                                        });
                                    }).catch(error => {
                                        res.status(400).send({ success: false, error });
                                        res.end();
                                    });
                                } else {
                                    console.log("adam ol aşağı daha inemiyom");
                                    res.status(200).send({ success: true });
                                    res.end();
                                }
                            } else {
                                console.log("first swap bulamadım");
                                res.status(200).send({ success: true });
                                res.end();
                            }
                        });
                    } else if (swapType == "dnd") {

                        if (!fieldId || !toFieldId || !cardId || !toCardId) {
                            res.status(400).send({ success: false, error: "invalid-params" });
                            res.end();
                            return;
                        }

                        // fieldId, toFieldId, cardId, toCardId,

                        const currCard = await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${cardId}`);
                        const toCard = await admin.database().ref(`/workspaces/${workspaceId}/fields/${toFieldId}/cards/${toCardId}`);

                        if (fieldId == toFieldId) {
                            await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${cardId}`).once("value", async (snapshot) => {
                                if (snapshot.exists()) {
                                    const _card = snapshot.val();
                                    console.log("changing card: ", snapshot.val());
                                    await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${toCardId}`).once("value", async (snapshot) => {
                                        if (snapshot.exists()) {
                                            console.log("toCard: ", snapshot.val());
                                            const _toCard = snapshot.val();
                                            await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${toCardId}`).update({ index: _card.index }, async () => {
                                                await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${cardId}`).update({ index: _toCard.index }, async () => {
                                                    console.log("done :D!!! ");
                                                    res.status(200).send({ success: true });
                                                    res.end();
                                                })
                                            })
                                        }
                                    });
                                }
                            });
                        } else {
                            currCard.once("value", async (snapshot) => {
                                if (snapshot.exists()) {
                                    const card = snapshot.val();
                                    toCard.once("value", async (snapshot) => {
                                        if (snapshot.exists()) {
                                            const toCard = { ...snapshot.val(), index: card.index };
                                            const _card = { ...card, index: snapshot.val().index };

                                            await admin.database().ref(`/workspaces/${workspaceId}/fields/${toFieldId}/cards/${toCardId}`).update(_card, async () => {
                                                await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${cardId}`).update(toCard, async () => {
                                                    console.log("done :D ");
                                                    res.status(200).send({ success: true });
                                                    res.end();
                                                });
                                            });

                                        } else {
                                            console.log("swap: second card doesnt exists");
                                        }
                                    });
                                } else {
                                    console.log("swap: first card doesnt exists");
                                }
                            });
                        }

                    }

                } else {

                    console.log(fieldId, toFieldId, cardId, toCardId);
                    res.status(400).send({ success: false, error: "cant-find-card-id" });
                }
            }).catch(error => {
                res.status(400).send({ success: false, error });
            });

            /*
            await admin.database().ref(`/workspaces/${workspaceId}/fields/${fieldId}/cards/${id}`).update({ title, desc, color, updatedAt: Date.now() }, () => {
                res.status(200).send({ success: true });
            }).catch(error => {
                res.status(400).send({ success: false, error });
            });
            */
        }
    }

    if (!workspaceAction[action.toLowerCase()]) {
        res.status(400).send({ success: false });
    } else {
        await workspaceAction[action.toLowerCase()]();
    }
}
